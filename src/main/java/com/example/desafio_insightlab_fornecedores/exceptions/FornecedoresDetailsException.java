package com.example.desafio_insightlab_fornecedores.exceptions;

// Exceção para detalhes de fornecedores não encontrados no sistema
public class FornecedoresDetailsException extends RuntimeException {
    public FornecedoresDetailsException(String messege) {
        super(messege);
    }
}
