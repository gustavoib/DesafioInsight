package com.example.desafio_insightlab_fornecedores.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

// Classe de tratamento de exceções globais do sistema
// A anotação @ControllerAdvice indica que a classe é um componente de Spring que pode tratar exceções em todos os controllers do sistema
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FornecedoresNotFoundException.class)
    private ResponseEntity<String> handleFornecedoresNotFoundException(FornecedoresNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(FornecedoresDetailsException.class)
    private ResponseEntity<String> handleFornecedoresDetailsException(FornecedoresDetailsException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity<String> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    private ResponseEntity<String> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(fieldError -> {
                    String fieldName = fieldError.getField();
                    String defaultMessege = fieldError.getDefaultMessage();
                    return fieldName + " " + defaultMessege;
                })
                .collect(Collectors.joining(", "));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

}