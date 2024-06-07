package com.example.desafio_insightlab_fornecedores.controller;

import com.example.desafio_insightlab_fornecedores.dtos.FornecedoresDto;
import com.example.desafio_insightlab_fornecedores.models.FornecedoresModel;
import com.example.desafio_insightlab_fornecedores.services.FornecedoresServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("fornecedores")
@CrossOrigin(origins = "https://dev-frontend--desafio-fullsatck-insight.netlify.app/home")
public class FornecedoresController {

    @Autowired
    private FornecedoresServices fornecedoresServices;

    @GetMapping("/list")
    public ResponseEntity<List<FornecedoresModel>> getAllFornecedores() {
        return ResponseEntity.status(HttpStatus.OK).body(fornecedoresServices.getAllFornecedores());
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<FornecedoresModel> getOneFornecedores(@PathVariable("id") UUID id) {
        return ResponseEntity.status(HttpStatus.OK).body(fornecedoresServices.getOneFornecedores(id));
    }

    @PostMapping("/save")
    public ResponseEntity <FornecedoresModel> saveFornecedores(@RequestBody @Valid FornecedoresDto fornecedor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(fornecedoresServices.saveFornecedores(fornecedor));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<FornecedoresModel> updateFornecedores(@PathVariable("id") UUID id, @RequestBody @Valid FornecedoresDto fornecedor) {
        return ResponseEntity.status(HttpStatus.OK).body(fornecedoresServices.updateFornecedores(id, fornecedor));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFornecedores(@PathVariable("id") UUID id) {
        fornecedoresServices.deleteFornecedores(id);
        return ResponseEntity.status(HttpStatus.OK).body("Fornecedor deletado com sucesso");
    }

}
