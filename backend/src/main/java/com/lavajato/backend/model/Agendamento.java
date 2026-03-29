package com.lavajato.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "agendamentos")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long clienteId;

    @Column(nullable = false)
    private String clienteNome;

    @Column(nullable = false)
    private Long veiculoId;

    @Column(nullable = false)
    private String veiculoNome;

    @Column(nullable = false)
    private String placa;

    @Column(nullable = false)
    private String tipoServico;

    @Column(nullable = false)
    private LocalDate data;

    public Agendamento() {
    }

    public Agendamento(
        Long clienteId,
        String clienteNome,
        Long veiculoId,
        String veiculoNome,
        String placa,
        String tipoServico,
        LocalDate data
    ) {
        this.clienteId = clienteId;
        this.clienteNome = clienteNome;
        this.veiculoId = veiculoId;
        this.veiculoNome = veiculoNome;
        this.placa = placa;
        this.tipoServico = tipoServico;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(Long veiculoId) {
        this.veiculoId = veiculoId;
    }

    public String getVeiculoNome() {
        return veiculoNome;
    }

    public void setVeiculoNome(String veiculoNome) {
        this.veiculoNome = veiculoNome;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getTipoServico() {
        return tipoServico;
    }

    public void setTipoServico(String tipoServico) {
        this.tipoServico = tipoServico;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
}
