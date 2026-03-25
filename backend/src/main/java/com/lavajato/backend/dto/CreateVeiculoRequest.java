package com.lavajato.backend.dto;

public record CreateVeiculoRequest(
    String modelo,
    String placa,
    Long clienteId
) {
}
