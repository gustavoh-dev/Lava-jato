import java.time.LocalDate;
import java.util.Scanner;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        LavaJatoService service = new LavaJatoService();
        ArrayList<Cliente> clientes = new ArrayList<>();
        ArrayList<Funcionario> funcionarios = new ArrayList<>();
        ArrayList<Servico> servicos = new ArrayList<>();
        ArrayList<Veiculo> veiculos = new ArrayList<>();

        // alguns dados padrão
        funcionarios.add(new Funcionario("Pedro", "88888-8888", "Lavador"));
        servicos.add(new Servico("Lavagem Completa", 50.0));

        int opcao;
        do {
            System.out.println("\n=== LAVA JATO CLEAN CAR ===");
            System.out.println("1 - Cadastrar cliente");
            System.out.println("2 - Cadastrar veículo");
            System.out.println("3 - Registrar atendimento");
            System.out.println("4 - Listar atendimentos");
            System.out.println("0 - Sair");
            System.out.print("Escolha: ");
            opcao = sc.nextInt();
            sc.nextLine(); // consumir enter

            switch (opcao) {
                case 1:
                    System.out.print("Nome do cliente: ");
                    String nome = sc.nextLine();
                    System.out.print("Telefone: ");
                    String telefone = sc.nextLine();
                    System.out.print("CPF: ");
                    String cpf = sc.nextLine();
                    clientes.add(new Cliente(nome, telefone, cpf));
                    System.out.println("Cliente cadastrado!");
                    break;

                case 2:
                    if (clientes.isEmpty()) {
                        System.out.println("Cadastre um cliente primeiro!");
                        break;
                    }
                    System.out.print("Placa: ");
                    String placa = sc.nextLine();
                    System.out.print("Modelo: ");
                    String modelo = sc.nextLine();
                    System.out.println("Escolha o cliente pelo número:");
                    for (int i = 0; i < clientes.size(); i++) {
                        System.out.println(i + " - " + clientes.get(i).getNome());
                    }
                    int cIndex = sc.nextInt();
                    sc.nextLine();
                    veiculos.add(new Veiculo(placa, modelo, clientes.get(cIndex)));
                    System.out.println("Veículo cadastrado!");
                    break;

                case 3:
                    if (veiculos.isEmpty()) {
                        System.out.println("Cadastre um veículo primeiro!");
                        break;
                    }
                    System.out.println("Escolha o veículo:");
                    for (int i = 0; i < veiculos.size(); i++) {
                        System.out.println(i + " - " + veiculos.get(i).getModelo());
                    }
                    int vIndex = sc.nextInt();
                    sc.nextLine();

                    Funcionario f = funcionarios.get(0);
                    Servico s = servicos.get(0);
                    Veiculo v = veiculos.get(vIndex);
                    Atendimento a = new Atendimento(v.getDono(), v, f, s, LocalDate.now());
                    a.registrarPagamento();
                    service.registrarAtendimento(a);
                    break;

                case 4:
                    service.listarAtendimentos();
                    break;

                case 0:
                    System.out.println("Encerrando...");
                    break;

                default:
                    System.out.println("Opção inválida!");
            }
        } while (opcao != 0);

        sc.close();
    }
}
