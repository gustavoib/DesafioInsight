package com.example.desafio_insightlab_fornecedores.services;

import com.example.desafio_insightlab_fornecedores.dtos.FornecedoresRecordDto;
import com.example.desafio_insightlab_fornecedores.models.FornecedoresModel;
import com.example.desafio_insightlab_fornecedores.repositories.FornecedoresRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class FornecedoresServices {
    @Autowired
    private FornecedoresRepository fornecedoresRepository;

    public List<FornecedoresModel> getAllFornecedores() {
        List<FornecedoresModel> fornecedores = fornecedoresRepository.findAll();

        if (fornecedores.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado");
        }
        return fornecedores;
    }

    public FornecedoresModel getOneFornecedores(UUID id) {
        return fornecedoresRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado"));
    }

    public FornecedoresModel saveFornecedores(FornecedoresRecordDto fornecedorRecordDto) {
        validateCnpj(fornecedorRecordDto.cnpj());
        validateTelefone(fornecedorRecordDto.telefone());

        var fornecedoresModel = new FornecedoresModel();
        BeanUtils.copyProperties(fornecedorRecordDto, fornecedoresModel);
        return fornecedoresRepository.save(fornecedoresModel);
    }

    public FornecedoresModel updateFornecedores(UUID id, FornecedoresRecordDto fornecedorRecordDto) {
        FornecedoresModel fornecedor = fornecedoresRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado"));

        if (!fornecedorRecordDto.cnpj().equals(fornecedor.getCnpj())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado");
        } else {
            validateTelefone(fornecedorRecordDto.telefone());
            BeanUtils.copyProperties(fornecedorRecordDto, fornecedor);
            return fornecedoresRepository.save(fornecedor);
        }
    }

    public void deleteFornecedores(UUID id) {
        fornecedoresRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado"));
        fornecedoresRepository.deleteById(id);
    }

    public void validateCnpj(String cnpj) {
        if (!cnpj.matches("\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}") || cnpj.length() != 18) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado");
        }
    }

    public void validateTelefone(String telefone) {
        if (!telefone.matches("\\(\\d{2}\\)\\d{5}-\\d{4}") || telefone.length() !=14) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado");
        }
    }
}
