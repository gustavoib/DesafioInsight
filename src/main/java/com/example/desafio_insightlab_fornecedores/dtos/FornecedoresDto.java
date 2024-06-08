package com.example.desafio_insightlab_fornecedores.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// DTO de fornecedores
// O DTO é uma classe que representa um objeto de transferência de dados para fornecedores
public record FornecedoresDto(
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