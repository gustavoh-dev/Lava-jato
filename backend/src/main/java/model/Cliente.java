public class Cliente extends Pessoa {
    private String cpf;

    public Cliente(String nome, String telefone, String cpf) {
        super(nome, telefone);
        this.cpf = cpf;
    }

    @Override
    public void exibirInfo() {
        System.out.println("Cliente: " + nome + " | CPF: " + cpf + " | Telefone: " + telefone);
    }
}
