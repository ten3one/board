package com.example.board_back.dto.request.board;

import java.util.List;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardDetailRequestDto {

    @NotBlank
    private int boardNumber;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotNull
    private List<String> boardImageList;

    @NotNull
    @Column(name = "write_datetime")
    private String writeDateTime;

    @NotNull
    @Email
    private String writerEmail;

    @NotNull
    private String writerNickname;

    private String writerProfileImage;
}
