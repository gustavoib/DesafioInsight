package com.example.desafio_insightlab_fornecedores.dtos;

import jakarta.validation.constraints.NotBlank;

// DTO de autenticação
// O DTO é uma classe que representa um objeto de transferência de dados para autenticação
public record AuthDto(
        @NotBlank String username,
        @NotBlank String password) {
}