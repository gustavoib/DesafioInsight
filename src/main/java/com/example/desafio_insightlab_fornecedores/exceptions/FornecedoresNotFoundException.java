package com.example.desafio_insightlab_fornecedores.exceptions;

public class FornecedoresNotFoundException extends RuntimeException {
    public FornecedoresNotFoundException() {
        super("Fornecedor não encontrado.");
    }
}
