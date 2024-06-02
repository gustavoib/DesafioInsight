package com.example.desafio_insightlab_fornecedores.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record FornecedoresRecordDto(
        @NotBlank String nome,
        @NotBlank String cnpj,
        @NotBlank String telefone,
        @NotBlank @Email String email,
        @NotBlank String categoria,
        @NotBlank String cep,
        @NotBlank String rua,
        @NotBlank String numero,
        @NotBlank String bairro,
        @NotBlank String cidade,
        @NotBlank String estado) {
}
