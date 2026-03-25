public class Veiculo {
    private String placa;
    private String modelo;
    private Cliente dono;

    public Veiculo(String placa, String modelo, Cliente dono) {
        this.placa = placa;
        this.modelo = modelo;
        this.dono = dono;
    }

    public void exibirInfo() {
        System.out.println("Veículo: " + modelo + " | Placa: " + placa + " | Dono: " + dono.getNome());
    }

    // ✅ adiciona os getters que o Main usa
    public String getModelo() {
        return modelo;
    }

    public Cliente getDono() {
        return dono;
    }
}
