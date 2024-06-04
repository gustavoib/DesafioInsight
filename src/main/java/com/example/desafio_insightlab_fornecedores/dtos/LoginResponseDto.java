package com.example.desafio_insightlab_fornecedores.dtos;

import com.example.desafio_insightlab_fornecedores.models.UsersModel;

public record LoginResponseDto(UsersModel user, String token) {
}
