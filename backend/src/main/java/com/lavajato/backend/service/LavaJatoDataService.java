package com.lavajato.backend.service;

import com.lavajato.backend.dto.CreateAgendamentoRequest;
import com.lavajato.backend.dto.CreateClienteRequest;
import com.lavajato.backend.dto.CreateServicoRequest;
import com.lavajato.backend.dto.CreateUsuarioRequest;
import com.lavajato.backend.dto.CreateVeiculoRequest;
import com.lavajato.backend.dto.DashboardHighlightResponse;
import com.lavajato.backend.dto.DashboardSummaryResponse;
import com.lavajato.backend.model.Agendamento;
import com.lavajato.backend.model.Cliente;
import com.lavajato.backend.model.Pagamento;
import com.lavajato.backend.model.Servico;
import com.lavajato.backend.model.Usuario;
import com.lavajato.backend.model.Veiculo;
import com.lavajato.backend.repository.AgendamentoRepository;
import com.lavajato.backend.repository.ClienteRepository;
import com.lavajato.backend.repository.PagamentoRepository;
import com.lavajato.backend.repository.ServicoRepository;
import com.lavajato.backend.repository.UsuarioRepository;
import com.lavajato.backend.repository.VeiculoRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LavaJatoDataService {

    private final ClienteRepository clienteRepository;
    private final VeiculoRepository veiculoRepository;
    private final AgendamentoRepository agendamentoRepository;
    private final PagamentoRepository pagamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ServicoRepository servicoRepository;

    public LavaJatoDataService(
        ClienteRepository clienteRepository,
        VeiculoRepository veiculoRepository,
        AgendamentoRepository agendamentoRepository,
        PagamentoRepository pagamentoRepository,
        UsuarioRepository usuarioRepository,
        ServicoRepository servicoRepository
    ) {
        this.clienteRepository = clienteRepository;
        this.veiculoRepository = veiculoRepository;
        this.agendamentoRepository = agendamentoRepository;
        this.pagamentoRepository = pagamentoRepository;
        this.usuarioRepository = usuarioRepository;
        this.servicoRepository = servicoRepository;
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

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAllByOrderByIdDesc();
    }

    public Usuario criarUsuario(CreateUsuarioRequest request) {
        validateText(request.nome(), "Nome do usuario e obrigatorio.");
        validateText(request.email(), "Email do usuario e obrigatorio.");
        validateText(request.senha(), "Senha do usuario e obrigatoria.");
        validateText(request.perfil(), "Perfil do usuario e obrigatorio.");

        Usuario usuario = new Usuario(
            request.nome(),
            request.email(),
            request.senha(),
            request.perfil()
        );

        return usuarioRepository.save(usuario);
    }

    public List<Servico> listarServicos() {
        return servicoRepository.findAllByOrderByIdDesc();
    }

    public Servico criarServico(CreateServicoRequest request) {
        validateText(request.nome(), "Nome do servico e obrigatorio.");
        validateText(request.descricao(), "Descricao do servico e obrigatoria.");

        if (request.valor() == null || request.valor().signum() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Valor do servico deve ser maior que zero.");
        }

        Servico servico = new Servico(
            request.nome(),
            request.descricao(),
            request.valor()
        );

        return servicoRepository.save(servico);
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
        Servico servico = buscarServicoPorNome(request.tipoServico());

        if (!veiculo.getClienteId().equals(cliente.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O veiculo nao pertence ao cliente informado.");
        }

        Agendamento agendamento = agendamentoRepository.save(new Agendamento(
            cliente.getId(),
            cliente.getNome(),
            veiculo.getId(),
            veiculo.getModelo(),
            veiculo.getPlaca(),
            servico.getNome(),
            request.data()
        ));

        pagamentoRepository.save(new Pagamento(
            cliente.getNome(),
            veiculo.getModelo(),
            servico.getNome(),
            servico.getValor(),
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

    private Servico buscarServicoPorNome(String nome) {
        return servicoRepository.findByNomeIgnoreCase(nome)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico nao encontrado."));
    }

    private void validateText(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }
}
