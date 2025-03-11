package com.example.board_back.dto.request.user;

import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateNicknameRequestDto {

    @NotBlank
    private String newNickname;

}
