package com.example.board_back.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import jakarta.persistence.*;

import com.example.board_back.dto.request.board.PostBoardRequestDto;
import com.example.board_back.dto.request.board.UpdateBoardRequestDto;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "board")
@Table(name = "board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNumber;

    @Column(name = "title")
    private String title;
    private String content;
    @Column(name = "write_datetime")
    private String writeDateTime;
    private int favoriteCount;
    private int commentCount;
    private int viewCount;
    private String writerEmail;

    public BoardEntity(PostBoardRequestDto dto, String email) {

        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateTime = simpleDateFormat.format(now);

        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.writeDateTime = dateTime;
        this.favoriteCount = 0;
        this.commentCount = 0;
        this.viewCount = 0;
        this.writerEmail = email;
    }

    public void increaseViewCount() {
        this.viewCount++;
    }

    public void increaseFavoriteCount() {
        this.favoriteCount++;
    }

    public void increaseCommentCount() {
        this.commentCount++;
    }

    public void decreaseFavoriteCount() {
        this.favoriteCount--;
    }

    public void updateBoard(UpdateBoardRequestDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
    }

}
