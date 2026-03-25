import java.time.LocalDate;

public class Atendimento {
    private Cliente cliente;
    private Veiculo veiculo;
    private Funcionario funcionario;
    private Servico servico;
    private LocalDate data;
    private boolean pago;

    public Atendimento(Cliente cliente, Veiculo veiculo, Funcionario funcionario, Servico servico, LocalDate data) {
        this.cliente = cliente;
        this.veiculo = veiculo;
        this.funcionario = funcionario;
        this.servico = servico;
        this.data = data;
        this.pago = false;
    }

    public void registrarPagamento() {
        this.pago = true;
        System.out.println("Pagamento registrado para " + cliente.getNome() + " no valor de R$ " + servico.getPreco());
    }

    public void exibirResumo() {
        System.out.println("Atendimento em " + data + " | Cliente: " + cliente.getNome() +
            " | Serviço: " + servico.getNome() + " | Funcionário: " + funcionario.getNome());
    }
}
