package com.example.board_back.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.board_back.dto.request.user.UpdateNicknameRequestDto;
import com.example.board_back.dto.request.user.UpdateProfileImageRequestDto;
import com.example.board_back.dto.request.user.UpdateUserinfoRequestDto;
import com.example.board_back.dto.response.user.GetSignInUserResponseDto;
import com.example.board_back.dto.response.user.GetUserResponseDto;
import com.example.board_back.dto.response.user.UpdateNicknameResponseDto;
import com.example.board_back.dto.response.user.UpdateProfileImageResponseDto;
import com.example.board_back.dto.response.user.UpdateUserInfoResponseDto;
import com.example.board_back.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{email}")
    public ResponseEntity<? super GetUserResponseDto> getUser(@PathVariable("email") String email) {
        ResponseEntity<? super GetUserResponseDto> response = userService.getUser(email);
        return response;
    }

    @GetMapping("")
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(@AuthenticationPrincipal String email) {
        ResponseEntity<? super GetSignInUserResponseDto> response = userService.getSignInUser(email);
        return response;
    }

    @PatchMapping("/nickname")
    public ResponseEntity<? super UpdateNicknameResponseDto> updateNickname(
            @RequestBody @Valid UpdateNicknameRequestDto requestBody,
            @AuthenticationPrincipal String email) {
        ResponseEntity<? super UpdateNicknameResponseDto> response = userService.updateNickname(requestBody, email);
        return response;
    }

    @PatchMapping("/profile-image")
    public ResponseEntity<? super UpdateProfileImageResponseDto> updateProfileImage(
            @RequestBody @Valid UpdateProfileImageRequestDto requestBody,
            @AuthenticationPrincipal String email) {
        ResponseEntity<? super UpdateProfileImageResponseDto> response = userService.updateProfileImage(requestBody,
                email);
        return response;
    }

    @PatchMapping("/user-info")
    public ResponseEntity<? super UpdateUserInfoResponseDto> updateUserInfo(
            @RequestBody @Valid UpdateUserinfoRequestDto requestBody) {
        ResponseEntity<? super UpdateUserInfoResponseDto> response = userService.updateUserInfo(requestBody);
        return response;
    }

}
