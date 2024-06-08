package com.example.desafio_insightlab_fornecedores.services;

import com.example.desafio_insightlab_fornecedores.dtos.FornecedoresDto;
import com.example.desafio_insightlab_fornecedores.exceptions.FornecedoresDetailsException;
import com.example.desafio_insightlab_fornecedores.exceptions.FornecedoresNotFoundException;
import com.example.desafio_insightlab_fornecedores.models.FornecedoresModel;
import com.example.desafio_insightlab_fornecedores.repositories.FornecedoresRepository;
import com.example.desafio_insightlab_fornecedores.utils.Utils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

// Classe de serviço para manipulação de fornecedores no sistema
// Aqui os requisitos de negócio (no caso os requisitos do desafio) são implementados
@Service
public class FornecedoresServices {
    @Autowired
    private FornecedoresRepository fornecedoresRepository;

    public List<FornecedoresModel> getAllFornecedores() {
        List<FornecedoresModel> fornecedores = fornecedoresRepository.findAll();
        if (fornecedores.isEmpty()) {
            throw new FornecedoresNotFoundException("Nenhum fornecedor cadastrado");
        }

        ZoneId brazilTimeZone = ZoneId.of("America/Sao_Paulo");
        fornecedores.forEach(fornecedor -> {
            LocalDateTime createdAt = fornecedor.getCreatedAt();
            ZonedDateTime createdAtInBrazil = createdAt.atZone(brazilTimeZone);
            fornecedor.setCreatedAt(createdAtInBrazil.toLocalDateTime());
        });

        return fornecedores;
    }

    public FornecedoresModel getOneFornecedores(UUID id) {
        return fornecedoresRepository.findById(id)
                .orElseThrow(FornecedoresNotFoundException::new);
    }

    public FornecedoresModel saveFornecedores(FornecedoresDto fornecedorRecordDto) {
        Utils.validateCnpj(fornecedorRecordDto.cnpj());
        Utils.validateTelefone(fornecedorRecordDto.telefone());
        Utils.validateCep(fornecedorRecordDto.cep());

        var fornecedoresModel = new FornecedoresModel();
        BeanUtils.copyProperties(fornecedorRecordDto, fornecedoresModel);
        return fornecedoresRepository.save(fornecedoresModel);
    }

    public FornecedoresModel updateFornecedores(UUID id, FornecedoresDto fornecedorRecordDto) {
        FornecedoresModel fornecedor = fornecedoresRepository.findById(id)
                .orElseThrow(FornecedoresNotFoundException::new);

        if (!fornecedorRecordDto.cnpj().equals(fornecedor.getCnpj())) {
            throw new FornecedoresDetailsException("Não é possível alterar o CNPJ");
        } else {
            Utils.validateTelefone(fornecedorRecordDto.telefone());
            Utils.validateCep(fornecedorRecordDto.cep());
            BeanUtils.copyProperties(fornecedorRecordDto, fornecedor);
            return fornecedoresRepository.save(fornecedor);
        }
    }

    public void deleteFornecedores(UUID id) {
        fornecedoresRepository.findById(id)
                .orElseThrow(FornecedoresNotFoundException::new);
        fornecedoresRepository.deleteById(id);
    }
}