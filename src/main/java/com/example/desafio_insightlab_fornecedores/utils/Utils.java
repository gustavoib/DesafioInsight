package com.example.desafio_insightlab_fornecedores.utils;

import com.example.desafio_insightlab_fornecedores.exceptions.FornecedoresDetailsException;

public class Utils {

    /* Classe de validação de campos especificos */
    public static void validateCnpj(String cnpj) {
        if (!cnpj.matches("\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}") || cnpj.length() != 18) {
            throw new FornecedoresDetailsException("CNPJ inválido");
        }
    }

    public static void validateTelefone(String telefone) {
        if (!telefone.matches("\\(\\d{2}\\)\\d{5}-\\d{4}") || telefone.length() !=14) {
            throw new FornecedoresDetailsException("Telefone inválido");
        }
    }

    public static void validateCep(String cep) {
        if (!cep.matches("\\d{5}-\\d{3}") || cep.length() != 9) {
            throw new FornecedoresDetailsException("CEP inválido");
        }
    }

}
