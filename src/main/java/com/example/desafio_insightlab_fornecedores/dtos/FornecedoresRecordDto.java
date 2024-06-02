package com.example.desafio_insightlab_fornecedores.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record FornecedoresRecordDto(
        @NotBlank String nome,
        @NotBlank String cnpj,
        @NotBlank String telefone,
        @NotBlank @Email String email,
        @NotBlank String rua,
        @NotBlank String numero,
        @NotBlank String bairro,
        @NotBlank String cidade,
        @NotBlank String estado) {
}
