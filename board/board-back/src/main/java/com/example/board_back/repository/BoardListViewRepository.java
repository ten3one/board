package com.example.board_back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.board_back.entity.BoardListViewEntity;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Integer> {

        List<BoardListViewEntity> findByOrderByWriteDateTimeDesc();

        List<BoardListViewEntity> findTop3ByWriteDateTimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDateTimeDesc(
                        String writeDateTime);

        List<BoardListViewEntity> findByTitleContainsOrContentContainsOrderByWriteDateTimeDesc(String title,
                        String content);
}
