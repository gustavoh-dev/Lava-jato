import java.util.ArrayList;
import java.util.List;

public class LavaJatoService implements GerenciadorAtendimentos {
    private List<Atendimento> atendimentos = new ArrayList<>();

    @Override
    public void registrarAtendimento(Atendimento atendimento) {
        atendimentos.add(atendimento);
        System.out.println("Atendimento registrado com sucesso!");
    }

    @Override
    public void listarAtendimentos() {
        System.out.println("---- Lista de Atendimentos ----");
        for (Atendimento a : atendimentos) {
            a.exibirResumo();
        }
    }
}
