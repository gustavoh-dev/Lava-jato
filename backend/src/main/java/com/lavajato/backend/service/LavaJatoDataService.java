package com.lavajato.backend.service;

import com.lavajato.backend.dto.CreateAgendamentoRequest;
import com.lavajato.backend.dto.CreateClienteRequest;
import com.lavajato.backend.dto.CreateVeiculoRequest;
import com.lavajato.backend.dto.DashboardHighlightResponse;
import com.lavajato.backend.dto.DashboardSummaryResponse;
import com.lavajato.backend.model.Agendamento;
import com.lavajato.backend.model.Cliente;
import com.lavajato.backend.model.Pagamento;
import com.lavajato.backend.model.Veiculo;
import com.lavajato.backend.repository.AgendamentoRepository;
import com.lavajato.backend.repository.ClienteRepository;
import com.lavajato.backend.repository.PagamentoRepository;
import com.lavajato.backend.repository.VeiculoRepository;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LavaJatoDataService {

    private final ClienteRepository clienteRepository;
    private final VeiculoRepository veiculoRepository;
    private final AgendamentoRepository agendamentoRepository;
    private final PagamentoRepository pagamentoRepository;

    private final Map<String, BigDecimal> tabelaPrecos = Map.of(
        "Lavagem simples", new BigDecimal("45.00"),
        "Lavagem completa", new BigDecimal("80.00"),
        "Higienizacao interna", new BigDecimal("95.00"),
        "Polimento tecnico", new BigDecimal("150.00"),
        "Enceramento", new BigDecimal("70.00")
    );

    public LavaJatoDataService(
        ClienteRepository clienteRepository,
        VeiculoRepository veiculoRepository,
        AgendamentoRepository agendamentoRepository,
        PagamentoRepository pagamentoRepository
    ) {
        this.clienteRepository = clienteRepository;
        this.veiculoRepository = veiculoRepository;
        this.agendamentoRepository = agendamentoRepository;
        this.pagamentoRepository = pagamentoRepository;
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAllByOrderByIdDesc();
    }

    public Cliente criarCliente(CreateClienteRequest request) {
        validateText(request.nome(), "Nome do cliente e obrigatorio.");
        validateText(request.telefone(), "Telefone e obrigatorio.");
        validateText(request.email(), "Email e obrigatorio.");

        Cliente cliente = new Cliente(request.nome(), request.telefone(), request.email());
        return clienteRepository.save(cliente);
    }

    @Transactional
    public void deletarCliente(Long id) {
        Cliente cliente = buscarCliente(id);
        agendamentoRepository.deleteByClienteId(id);
        veiculoRepository.deleteByClienteId(id);
        pagamentoRepository.deleteByClienteNome(cliente.getNome());
        clienteRepository.delete(cliente);
    }

    public List<Veiculo> listarVeiculos() {
        return veiculoRepository.findAllByOrderByIdDesc();
    }

    public Veiculo criarVeiculo(CreateVeiculoRequest request) {
        validateText(request.modelo(), "Modelo do veiculo e obrigatorio.");
        validateText(request.placa(), "Placa e obrigatoria.");

        Cliente cliente = buscarCliente(request.clienteId());
        Veiculo veiculo = new Veiculo(
            request.modelo(),
            request.placa().toUpperCase(),
            cliente.getId(),
            cliente.getNome()
        );

        return veiculoRepository.save(veiculo);
    }

    public List<Agendamento> listarAgendamentos() {
        return agendamentoRepository.findAllByOrderByIdDesc();
    }

    @Transactional
    public Agendamento criarAgendamento(CreateAgendamentoRequest request) {
        validateText(request.tipoServico(), "Tipo de servico e obrigatorio.");

        if (request.data() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Data do agendamento e obrigatoria.");
        }

        Cliente cliente = buscarCliente(request.clienteId());
        Veiculo veiculo = buscarVeiculo(request.veiculoId());

        if (!veiculo.getClienteId().equals(cliente.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O veiculo nao pertence ao cliente informado.");
        }

        Agendamento agendamento = agendamentoRepository.save(new Agendamento(
            cliente.getId(),
            cliente.getNome(),
            veiculo.getId(),
            veiculo.getModelo(),
            veiculo.getPlaca(),
            request.tipoServico(),
            request.data()
        ));

        pagamentoRepository.save(new Pagamento(
            cliente.getNome(),
            veiculo.getModelo(),
            request.tipoServico(),
            tabelaPrecos.getOrDefault(request.tipoServico(), new BigDecimal("50.00")),
            request.data(),
            false
        ));

        return agendamento;
    }

    public List<Pagamento> listarPagamentos(LocalDate data) {
        if (data == null) {
            return pagamentoRepository.findAllByOrderByIdDesc();
        }

        return pagamentoRepository.findByDataOrderByIdDesc(data);
    }

    public void marcarPagamentoComoPago(Long id) {
        Pagamento pagamento = pagamentoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pagamento nao encontrado."));

        pagamento.setPago(true);
        pagamentoRepository.save(pagamento);
    }

    public DashboardSummaryResponse getDashboardSummary() {
        long clients = clienteRepository.count();
        long vehicles = veiculoRepository.count();
        long servicesToday = pagamentoRepository.countByData(LocalDate.now());

        return new DashboardSummaryResponse(
            new DashboardSummaryResponse.DashboardTotalsResponse(clients, vehicles, servicesToday),
            List.of(
                new DashboardHighlightResponse(
                    "Total de clientes",
                    clients,
                    "Quantidade total de clientes cadastrados.",
                    "dashboard-accent-primary"
                ),
                new DashboardHighlightResponse(
                    "Total de veiculos",
                    vehicles,
                    "Quantidade total de veiculos registrados.",
                    "dashboard-accent-secondary"
                ),
                new DashboardHighlightResponse(
                    "Servicos hoje",
                    servicesToday,
                    "Quantidade de servicos registrados para hoje.",
                    "dashboard-accent-warning"
                )
            )
        );
    }

    private Cliente buscarCliente(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente e obrigatorio.");
        }

        return clienteRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente nao encontrado."));
    }

    private Veiculo buscarVeiculo(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Veiculo e obrigatorio.");
        }

        return veiculoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Veiculo nao encontrado."));
    }

    private void validateText(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }
}
