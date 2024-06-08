package com.example.desafio_insightlab_fornecedores.dtos;

import com.example.desafio_insightlab_fornecedores.models.UsersModel;

// DTO de resposta de login
// O DTO é uma classe que representa um objeto de transferência de dados para a resposta de login
public record LoginResponseDto(UsersModel user, String token) {
}