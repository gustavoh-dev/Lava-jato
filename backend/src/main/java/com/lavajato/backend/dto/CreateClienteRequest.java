package com.lavajato.backend.dto;

public record CreateClienteRequest(
    String nome,
    String telefone,
    String email
) {
}
