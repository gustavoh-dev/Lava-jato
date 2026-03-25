public class Funcionario extends Pessoa {
    private String cargo;

    public Funcionario(String nome, String telefone, String cargo) {
        super(nome, telefone);
        this.cargo = cargo;
    }

    @Override
    public void exibirInfo() {
        System.out.println("Funcionário: " + nome + " | Cargo: " + cargo);
    }
}
