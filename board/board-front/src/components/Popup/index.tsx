import React, { ChangeEvent, useRef, useState } from "react";
import "./style.css";
import { User } from "types/interface";
import defaultProfileImage from "assets/image/default-profile-image.png";
import { useCookies } from "react-cookie";
import { UpdateUserInfoRequestDto } from "apis/request/user";
import { fileUploadRequest, updateUserInfoRequest } from "apis";
import { UpdateUserInfoResponseDto } from "apis/response/user";
import { ResponseDto } from "apis/response";

interface PopupProps {
  user: User;
  onClose: () => void;
  onUpdate: (user: User) => void;
}

//          component: 개인정보 팝업 화면 레이아웃        //
const Popup: React.FC<PopupProps> = ({ user, onClose, onUpdate }) => {
  //          state: 유저 닉네임 상태         //
  const [nickname, setNickname] = useState<string>(user.nickname);
  //          state: 유저 프로필이미지 주소 상태         //
  const [profileImage, setProfileImage] = useState<string | null>(
    user.profileImage
  );

  //          state: 변경 프로필이미지 주소 상태         //
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);

  //          state: 닉네임 참조 상태         //
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  //          state: 프로필이미지 참조 상태         //
  const profileImageRef = useRef<HTMLInputElement | null>(null);
  //          state: 쿠키 상태         //
  const [cookies, setCookie] = useCookies();
  //          state: data 상태         //
  const data = new FormData();

  //          function: file Upload Response 처리 함수          //
  const fileUploadResponse = (profileImage: string | null) => {
    console.log(!profileImage);
    if (profileImage === undefined) return;
    if (!cookies.accessToken) return;

    setNewProfileImage(profileImage);
  };

  //          function: update userinfo response 처리 함수          //
  const updateUserInfoResponse = (
    responseBody: UpdateUserInfoResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "VF") alert("닉네임을 입력해주세요.");
    if (code === "AF") alert("인증에 실패했습니다.");
    if (code === "DN") alert("중복되는 닉네임입니다.");
    if (code === "NU") alert("존재하지 않는 유저입니다.");
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code !== "SU") return;

    onUpdate({
      ...user,
      nickname: nickname,
      profileImage: profileImage,
    });
    onClose();
  };

  //          event handler: 수정 버튼 클릭 이벤트 처리          //
  const onUpdateButtonClickHandler = async () => {
    if (!cookies.accessToken) return;

    const requestBody: UpdateUserInfoRequestDto = {
      email: user.email,
      nickname: nickname,
      profileImage: profileImage ? profileImage : newProfileImage,
    };

    updateUserInfoRequest(requestBody, cookies.accessToken).then(
      updateUserInfoResponse
    );
  };

  //          event handler: 닫기 버튼 클릭 이벤트 처리 함수         //
  const onCloseButtonClickHandler = () => {
    onClose();
  };

  //          event handler: 닉네임 입력란 변경 이벤트 처리 함수         //
  const onNicknameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  //          event handler: 프로필이미지 파일 변경 이벤트 처리 함수         //
  const onProfileImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    const file = e.target.files[0];

    data.append("file", file);

    fileUploadRequest(data).then(fileUploadResponse);
  };

  //          event handler: 이미지 닫기 버튼 클릭 이벤트 처리 함수         //
  const onImageCloseButtonClickHandler = () => {
    setProfileImage(null);
    profileImageRef.current!.value = "";
    data.delete("file");

    fileUploadResponse(null);
  };

  //          render: 개인정보 팝업 화면 레이아웃 렌더링         //
  return (
    <>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-container" onClick={(e) => e.stopPropagation()}>
          <div className="popup-title">{`개인정보 수정`}</div>
          <span className="popup-close" onClick={onClose}>
            &times;
          </span>
          <div className="divider"></div>
          <div className="popup-user-content-box">
            <div className="popup-user-info">
              <div className="popup-user-info-item">
                <div className="popup-user-info-title">{`e-mail`}</div>
                <div className="popup-user-info-content">{user.email}</div>
              </div>
              <div className="popup-user-info-item">
                <div className="popup-user-info-title">{`nickname`}</div>{" "}
                <input
                  ref={nicknameRef}
                  className="popup-user-info-input"
                  type="text"
                  value={nickname}
                  onChange={onNicknameChangeHandler}
                />
              </div>
              <div className="popup-user-info-item">
                <div className="popup-user-info-title">{`profile-image`}</div>
                <div className="popup-user-image-box">
                  <img
                    className="popup-user-info-image"
                    src={profileImage ? profileImage : defaultProfileImage}
                    alt="Profile"
                  />
                  <div
                    className="icon-button"
                    onClick={onImageCloseButtonClickHandler}
                  >
                    <div className="icon close-icon"></div>
                  </div>
                </div>
                <input
                  ref={profileImageRef}
                  className="popup-user-info-input"
                  type="file"
                  accept={"image/*"}
                  onChange={onProfileImageChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className="popup-buttons">
            <button
              className={`popup-button ${!nickname ? "disabled" : ""}`}
              onClick={onUpdateButtonClickHandler}
              disabled={!nickname}
            >
              수정
            </button>
            <button
              className="popup-button"
              onClick={onCloseButtonClickHandler}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
