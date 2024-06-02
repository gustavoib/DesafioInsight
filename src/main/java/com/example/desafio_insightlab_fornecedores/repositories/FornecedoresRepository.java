package com.example.desafio_insightlab_fornecedores.repositories;

import com.example.desafio_insightlab_fornecedores.models.FornecedoresModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FornecedoresRepository extends JpaRepository<FornecedoresModel, UUID> {
}
