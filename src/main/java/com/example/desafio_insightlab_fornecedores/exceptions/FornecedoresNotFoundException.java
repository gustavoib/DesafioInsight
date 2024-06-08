package com.example.desafio_insightlab_fornecedores.exceptions;

// Exceção personalizada para fornecedores não encontrados
// A exceção é lançada quando um fornecedor não é encontrado no banco de dados
public class FornecedoresNotFoundException extends RuntimeException {
    public FornecedoresNotFoundException() {
        super("Fornecedor não encontrado.");
    }
    public FornecedoresNotFoundException(String message) { super(message); }
}