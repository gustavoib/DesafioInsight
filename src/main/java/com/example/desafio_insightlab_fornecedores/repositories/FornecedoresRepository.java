package com.example.desafio_insightlab_fornecedores.repositories;

import com.example.desafio_insightlab_fornecedores.models.FornecedoresModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FornecedoresRepository extends JpaRepository<FornecedoresModel, UUID> {
    List<FornecedoresModel> findAllByOrderByCreatedAtDesc();
    List<FornecedoresModel> findAllByOrderByCategoria();
    List<FornecedoresModel> findAllByOrderByCreatedAtAsc();
}
