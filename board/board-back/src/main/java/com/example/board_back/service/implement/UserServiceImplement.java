package com.example.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.board_back.dto.request.user.UpdateNicknameRequestDto;
import com.example.board_back.dto.request.user.UpdateProfileImageRequestDto;
import com.example.board_back.dto.response.ResponseDto;
import com.example.board_back.dto.response.user.GetSignInUserResponseDto;
import com.example.board_back.dto.response.user.GetUserResponseDto;
import com.example.board_back.dto.response.user.UpdateNicknameResponseDto;
import com.example.board_back.dto.response.user.UpdateProfileImageResponseDto;
import com.example.board_back.entity.UserEntity;
import com.example.board_back.repository.UserRepository;
import com.example.board_back.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String email) {

        UserEntity userEntity = null;

        try {

            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                return GetUserResponseDto.notExistUser();
            }

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetUserResponseDto.success(userEntity);

    }

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {

        UserEntity userEntity = null;

        try {

            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                return GetSignInUserResponseDto.notExistUser();
            }

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetSignInUserResponseDto.success(userEntity);
    }

    @Override
    public ResponseEntity<? super UpdateNicknameResponseDto> updateNickname(UpdateNicknameRequestDto dto,
            String email) {

        try {

            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                return UpdateNicknameResponseDto.notExistUser();
            }

            String nickname = dto.getNewNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if (existedNickname) {
                return UpdateNicknameResponseDto.duplicateNickname();
            }

            userEntity.setNickname(nickname);
            userRepository.save(userEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return UpdateNicknameResponseDto.success();

    }

    @Override
    public ResponseEntity<? super UpdateProfileImageResponseDto> updateProfileImage(UpdateProfileImageRequestDto dto,
            String email) {

        try {

            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                return UpdateNicknameResponseDto.notExistUser();
            }

            String profileImage = dto.getProfileImage();

            userEntity.setProfileImage(profileImage);
            userRepository.save(userEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return UpdateProfileImageResponseDto.success();

    }
}
