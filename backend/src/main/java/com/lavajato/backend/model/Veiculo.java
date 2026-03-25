package com.lavajato.backend.model;

public class Veiculo {
    private Long id;
    private String modelo;
    private String placa;
    private Long clienteId;
    private String clienteNome;

    public Veiculo() {
    }

    public Veiculo(Long id, String modelo, String placa, Long clienteId, String clienteNome) {
        this.id = id;
        this.modelo = modelo;
        this.placa = placa;
        this.clienteId = clienteId;
        this.clienteNome = clienteNome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteNome() {
        return clienteNome;
    }

    public void setClienteNome(String clienteNome) {
        this.clienteNome = clienteNome;
    }
}
