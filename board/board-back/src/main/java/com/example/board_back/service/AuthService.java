package com.example.board_back.service;

import com.example.board_back.dto.request.auth.SignInRequestDto;
import com.example.board_back.dto.request.auth.SignUpRequestDto;
import com.example.board_back.dto.response.auth.SignInResponseDto;
import com.example.board_back.dto.response.auth.SignUpResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);

    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);

}
