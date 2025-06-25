package com.example.artgal.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String message;
    private String username;
    private String role;
}