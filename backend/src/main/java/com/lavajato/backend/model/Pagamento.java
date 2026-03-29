package com.lavajato.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "pagamentos")
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String clienteNome;

    @Column(nullable = false)
    private String veiculoNome;

    @Column(nullable = false)
    private String servico;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private boolean pago;

    public Pagamento() {
    }

    public Pagamento(
        String clienteNome,
        String veiculoNome,
        String servico,
        BigDecimal valor,
        LocalDate data,
        boolean pago
    ) {
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
