package com.example.banking.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,String> handleIllegalArgument(IllegalArgumentException e) {
        Map<String,String> response = new HashMap<>();
        response.put("error", e.getMessage());
        return response;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String,String> handleException(Exception e) {
        Map<String,String> response = new HashMap<>();
        response.put("error", "Unexpected server error");
        return response;
    }
}
