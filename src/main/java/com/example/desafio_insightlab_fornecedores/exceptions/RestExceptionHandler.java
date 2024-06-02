package com.example.desafio_insightlab_fornecedores.exceptions;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.stream.Collectors;

@ControllerAdvice
public class RestExceptionHandler {

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
