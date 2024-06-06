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
import java.util.List;
import java.util.UUID;

@Service
public class FornecedoresServices {
    @Autowired
    private FornecedoresRepository fornecedoresRepository;

    /* listar todos os fornecedores - requisito do desafio */
    public List<FornecedoresModel> getAllFornecedores() {
        List<FornecedoresModel> fornecedores = fornecedoresRepository.findAll();
        if (fornecedores.isEmpty()) {
            throw new FornecedoresNotFoundException("Nenhum fornecedor cadastrado");
        }
        return fornecedores;
    }

    /* listar um fornecedor específico - requisito do desafio */
    public FornecedoresModel getOneFornecedores(UUID id) {
        return fornecedoresRepository.findById(id)
                .orElseThrow(() -> new FornecedoresNotFoundException());
    }

    /* cadastrar um fornecedor - requisito do desafio */
    public FornecedoresModel saveFornecedores(FornecedoresDto fornecedorRecordDto) {
        Utils.validateCnpj(fornecedorRecordDto.cnpj());
        Utils.validateTelefone(fornecedorRecordDto.telefone());
        Utils.validateCep(fornecedorRecordDto.cep());

        var fornecedoresModel = new FornecedoresModel();
        BeanUtils.copyProperties(fornecedorRecordDto, fornecedoresModel);
        return fornecedoresRepository.save(fornecedoresModel);
    }

    /* editar um fornecedor - requisito do desafio */
    public FornecedoresModel updateFornecedores(UUID id, FornecedoresDto fornecedorRecordDto) {
        FornecedoresModel fornecedor = fornecedoresRepository.findById(id)
                .orElseThrow(() -> new FornecedoresNotFoundException());

        if (!fornecedorRecordDto.cnpj().equals(fornecedor.getCnpj())) {
            throw new FornecedoresDetailsException("Não é possível alterar o CNPJ");
        } else {
            Utils.validateTelefone(fornecedorRecordDto.telefone());
            Utils.validateCep(fornecedorRecordDto.cep());
            BeanUtils.copyProperties(fornecedorRecordDto, fornecedor);
            return fornecedoresRepository.save(fornecedor);
        }
    }

    /* deleta um fornecedor - requisito do desafio */
    public void deleteFornecedores(UUID id) {
        fornecedoresRepository.findById(id)
                .orElseThrow(() -> new FornecedoresNotFoundException());
        fornecedoresRepository.deleteById(id);
    }
}
