package com.example.board_back.service;

import org.springframework.http.ResponseEntity;

import com.example.board_back.dto.response.search.GetPopularListResponseDto;
import com.example.board_back.dto.response.search.GetRelationListResponseDto;

public interface SearchService {
    ResponseEntity<? super GetPopularListResponseDto> getPopularList();

    ResponseEntity<? super GetRelationListResponseDto> getRelaionList(String searchWord);
}
