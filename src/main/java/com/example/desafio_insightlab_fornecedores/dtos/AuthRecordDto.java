package com.example.desafio_insightlab_fornecedores.dtos;

import jakarta.validation.constraints.NotBlank;

public record AuthRecordDto(
        @NotBlank String username,
        @NotBlank String password) {
}
