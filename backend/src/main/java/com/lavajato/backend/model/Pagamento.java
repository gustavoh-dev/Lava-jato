package com.lavajato.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Pagamento {
    private Long id;
    private String clienteNome;
    private String veiculoNome;
    private String servico;
    private BigDecimal valor;
    private LocalDate data;
    private boolean pago;

    public Pagamento() {
    }

    public Pagamento(
        Long id,
        String clienteNome,
        String veiculoNome,
        String servico,
        BigDecimal valor,
        LocalDate data,
        boolean pago
    ) {
        this.id = id;
        this.clienteNome = clienteNome;
        this.veiculoNome = veiculoNome;
        this.servico = servico;
        this.valor = valor;
        this.data = data;
        this.pago = pago;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClienteNome() {
        return clienteNome;
    }

    public void setClienteNome(String clienteNome) {
        this.clienteNome = clienteNome;
    }

    public String getVeiculoNome() {
        return veiculoNome;
    }

    public void setVeiculoNome(String veiculoNome) {
        this.veiculoNome = veiculoNome;
    }

    public String getServico() {
        return servico;
    }

    public void setServico(String servico) {
        this.servico = servico;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public boolean isPago() {
        return pago;
    }

    public void setPago(boolean pago) {
        this.pago = pago;
    }
}
