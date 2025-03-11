package com.example.board_back.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateUserinfoRequestDto {

    @NotNull
    private String email;

    @NotBlank
    private String nickname;

    private String profileImage;
}
