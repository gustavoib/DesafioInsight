package com.example.desafio_insightlab_fornecedores.dtos;

import jakarta.validation.constraints.NotBlank;

public record AuthDto(
        @NotBlank String username,
        @NotBlank String password) {
}
