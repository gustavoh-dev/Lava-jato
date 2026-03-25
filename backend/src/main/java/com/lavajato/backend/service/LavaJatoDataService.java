package com.lavajato.backend.service;

import com.lavajato.backend.dto.CreateAgendamentoRequest;
import com.lavajato.backend.dto.CreateClienteRequest;
import com.lavajato.backend.dto.CreateVeiculoRequest;
import com.lavajato.backend.model.Agendamento;
import com.lavajato.backend.model.Cliente;
import com.lavajato.backend.model.Pagamento;
import com.lavajato.backend.model.Veiculo;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LavaJatoDataService {

    private final List<Cliente> clientes = new ArrayList<>();
    private final List<Veiculo> veiculos = new ArrayList<>();
    private final List<Agendamento> agendamentos = new ArrayList<>();
    private final List<Pagamento> pagamentos = new ArrayList<>();

    private final AtomicLong clienteSequence = new AtomicLong(0);
    private final AtomicLong veiculoSequence = new AtomicLong(0);
    private final AtomicLong agendamentoSequence = new AtomicLong(0);
    private final AtomicLong pagamentoSequence = new AtomicLong(0);

    private final Map<String, BigDecimal> tabelaPrecos = Map.of(
        "Lavagem simples", new BigDecimal("45.00"),
        "Lavagem completa", new BigDecimal("80.00"),
        "Higienizacao interna", new BigDecimal("95.00"),
        "Polimento tecnico", new BigDecimal("150.00"),
        "Enceramento", new BigDecimal("70.00")
    );

    public LavaJatoDataService() {
        Cliente mariana = addClienteInterno("Mariana Costa", "(11) 99999-1234", "mariana@lavajato.com");
        Cliente carlos = addClienteInterno("Carlos Lima", "(11) 98888-4321", "carlos@lavajato.com");
        Cliente fernanda = addClienteInterno("Fernanda Alves", "(11) 97777-0101", "fernanda@lavajato.com");

        Veiculo onix = addVeiculoInterno("Onix LT", "BRA2E19", mariana);
        Veiculo hb20 = addVeiculoInterno("HB20 Comfort", "QWE4H67", carlos);
        Veiculo toro = addVeiculoInterno("Toro Volcano", "XYZ8K21", fernanda);

        addAgendamentoInterno(mariana, onix, "Lavagem completa", LocalDate.now());
        addAgendamentoInterno(carlos, hb20, "Polimento tecnico", LocalDate.now());
        addAgendamentoInterno(fernanda, toro, "Higienizacao interna", LocalDate.now().plusDays(1));
    }

    public List<Cliente> listarClientes() {
        return clientes.stream()
            .sorted(Comparator.comparing(Cliente::getId).reversed())
            .toList();
    }

    public Cliente criarCliente(CreateClienteRequest request) {
        validateText(request.nome(), "Nome do cliente e obrigatorio.");
        validateText(request.telefone(), "Telefone e obrigatorio.");
        validateText(request.email(), "Email e obrigatorio.");

        return addClienteInterno(request.nome(), request.telefone(), request.email());
    }

    public void deletarCliente(Long id) {
        Cliente cliente = buscarCliente(id);
        clientes.remove(cliente);
        veiculos.removeIf(veiculo -> veiculo.getClienteId().equals(id));
        agendamentos.removeIf(agendamento -> agendamento.getClienteId().equals(id));
        pagamentos.removeIf(pagamento -> pagamento.getClienteNome().equals(cliente.getNome()));
    }

    public List<Veiculo> listarVeiculos() {
        return veiculos.stream()
            .sorted(Comparator.comparing(Veiculo::getId).reversed())
            .toList();
    }

    public Veiculo criarVeiculo(CreateVeiculoRequest request) {
        validateText(request.modelo(), "Modelo do veiculo e obrigatorio.");
        validateText(request.placa(), "Placa e obrigatoria.");

        Cliente cliente = buscarCliente(request.clienteId());
        return addVeiculoInterno(request.modelo(), request.placa(), cliente);
    }

    public List<Agendamento> listarAgendamentos() {
        return agendamentos.stream()
            .sorted(Comparator.comparing(Agendamento::getId).reversed())
            .toList();
    }

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

        return addAgendamentoInterno(cliente, veiculo, request.tipoServico(), request.data());
    }

    public List<Pagamento> listarPagamentos(LocalDate data) {
        return pagamentos.stream()
            .filter(pagamento -> data == null || pagamento.getData().equals(data))
            .sorted(Comparator.comparing(Pagamento::getId).reversed())
            .toList();
    }

    public void marcarPagamentoComoPago(Long id) {
        Pagamento pagamento = pagamentos.stream()
            .filter(item -> item.getId().equals(id))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pagamento nao encontrado."));

        pagamento.setPago(true);
    }

    private Cliente addClienteInterno(String nome, String telefone, String email) {
        Cliente cliente = new Cliente(clienteSequence.incrementAndGet(), nome, telefone, email);
        clientes.add(cliente);
        return cliente;
    }

    private Veiculo addVeiculoInterno(String modelo, String placa, Cliente cliente) {
        Veiculo veiculo = new Veiculo(
            veiculoSequence.incrementAndGet(),
            modelo,
            placa.toUpperCase(),
            cliente.getId(),
            cliente.getNome()
        );
        veiculos.add(veiculo);
        return veiculo;
    }

    private Agendamento addAgendamentoInterno(Cliente cliente, Veiculo veiculo, String tipoServico, LocalDate data) {
        Agendamento agendamento = new Agendamento(
            agendamentoSequence.incrementAndGet(),
            cliente.getId(),
            cliente.getNome(),
            veiculo.getId(),
            veiculo.getModelo(),
            veiculo.getPlaca(),
            tipoServico,
            data
        );

        agendamentos.add(agendamento);
        pagamentos.add(new Pagamento(
            pagamentoSequence.incrementAndGet(),
            cliente.getNome(),
            veiculo.getModelo(),
            tipoServico,
            tabelaPrecos.getOrDefault(tipoServico, new BigDecimal("50.00")),
            data,
            false
        ));

        return agendamento;
    }

    private Cliente buscarCliente(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente e obrigatorio.");
        }

        return clientes.stream()
            .filter(cliente -> cliente.getId().equals(id))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente nao encontrado."));
    }

    private Veiculo buscarVeiculo(Long id) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Veiculo e obrigatorio.");
        }

        return veiculos.stream()
            .filter(veiculo -> veiculo.getId().equals(id))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Veiculo nao encontrado."));
    }

    private void validateText(String value, String message) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
    }
}
