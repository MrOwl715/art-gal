package com.example.artgal.service;

import com.example.artgal.dto.LoginRequest;
import com.example.artgal.dto.LoginResponse;
import com.example.artgal.dto.RegisterRequest;
import com.example.artgal.dto.RegisterResponse;
import com.example.artgal.entity.User;
import com.example.artgal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(User.Status.active);
        userRepository.save(user);

        LoginResponse response = new LoginResponse();
        response.setMessage("Login successful");
        response.setUsername(user.getUsername());
        response.setRole(user.getRole().name());
        return response;
    }

    public String logout(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus(User.Status.logged_out);
        userRepository.save(user);
        SecurityContextHolder.clearContext();
        return "Logout successful";
    }

    public RegisterResponse register(RegisterRequest registerRequest) {
        // Kiểm tra username đã tồn tại
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Kiểm tra email đã tồn tại
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Tạo user mới
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFullName(registerRequest.getFullName());
        user.setEmail(registerRequest.getEmail());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        try {
            user.setRole(User.Role.valueOf(registerRequest.getRole()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + registerRequest.getRole());
        }
        user.setStatus(User.Status.logged_out);

        // Lưu user vào database
        userRepository.save(user);

        // Tạo response
        RegisterResponse response = new RegisterResponse();
        response.setMessage("Registration successful");
        response.setUsername(user.getUsername());
        return response;
    }
}