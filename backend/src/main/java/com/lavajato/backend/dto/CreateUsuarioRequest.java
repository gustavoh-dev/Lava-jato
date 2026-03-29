package com.lavajato.backend.dto;

public record CreateUsuarioRequest(
    String nome,
    String email,
    String senha,
    String perfil
) {
}
