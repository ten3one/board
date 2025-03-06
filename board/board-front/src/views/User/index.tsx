import { ResponseDto } from "apis/response";
import { GetUserBoardListResponseDto } from "apis/response/board";
import BoardItem from "components/BoardItem";
import Pagination from "components/Pagination";
import { BOARD_PATH, BOARD_WRITE_PATH, USER_PATH } from "constant";
import { usePagination } from "hooks";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardListItem } from "types/interface";
import "./style.css";

import { getUserBoardListRequest, getUserRequest } from "apis";
import { GetUserResponseDto } from "apis/response/user";
import defaultProfileImage from "assets/image/default-profile-image.png";
import { useLoginUserStore } from "stores";

//          component: 유저 화면 컴포넌트          //
export default function User() {
  //          function: 네비게이트          //
  const Navigate = useNavigate();

  //          state: 게시물 작성자 메일 상태          //
  const { userEmail } = useParams();
  //          state: 로그인 유저 상태          //
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();

  //          state: 게시물 작성자 닉네임 상태          //
  const [writerNickname, setWriterNickname] = useState<string>("");
  //          state: 게시물 작성자 프포필 이미지 상태          //
  const [writeProfileImageUrl, setWriteProfileImageUrl] = useState<
    string | null
  >("");

  //          function: get User Response 처리 함수          //
  const getUserResponse = (
    responseBody: GetUserResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류입니다.");
    if (code !== "SU") return;

    const { nickname, profileImage } = responseBody as GetUserResponseDto;

    setWriterNickname(nickname);
    setWriteProfileImageUrl(profileImage);
  };

  //          effect: 화면 열릴 때 실행될 함수          //
  useEffect(() => {
    if (!userEmail) return;
    getUserRequest(userEmail).then(getUserResponse);
  }, [userEmail]);

  //          component: 유저 화면 상단 화면 컴포넌트          //
  const UserTop = () => {
    //          state: 이미지 입력 요소 참조 상태          //
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    //          state: 게시물 이미지 미리보기 URL 상태          //
    const [imageUrl, setImageUrl] = useState<string>("");

    //          event handler: 닉네임 수정 아이콘 클릭 이벤트 처리          //
    const onUpdateNicknameClickHandler = () => {
      // Navigate();
    };

    //          event handler: 이미지 변경 이벤트 처리          //
    const onImageChangeHandler = () => {};

    //          event handler: 프로필 이미지 수정 아이콘 클릭 이벤트 처리          //
    const onUpdateProfileImageClickHandler = () => {};

    //          event handler: 이미지 닫기 버튼 클릭 이벤트 처리          //
    const onImageCloseButtonClickHandler = () => {};

    //          render:유저메인 화면 상단 컴포넌트 렌더링         //
    return (
      <>
        <div id="user-top-wrapper">
          <div className="user-top-container">
            <div
              className="user-top-profile-image-box"
              onClick={onUpdateProfileImageClickHandler}
            >
              <div
                className="user-top-profile-image"
                style={{
                  backgroundImage: `url(${
                    writeProfileImageUrl
                      ? writeProfileImageUrl
                      : defaultProfileImage
                  })`,
                }}
              ></div>
            </div>
            <div className="user-top-profile-box">
              <div
                className="user-top-profile-nickname"
                contentEditable="inherit"
              >
                {writerNickname}
              </div>
              <div className="user-top-profile-email">{userEmail}</div>
            </div>
            {loginUser?.email === userEmail && (
              <div className="user-top-profile-nickname-update">
                <div
                  className="icon-box"
                  onClick={onUpdateNicknameClickHandler}
                >
                  <div className="icon edit-light-icon"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  //          component: 유저 화면 하단 화면 컴포넌트          //
  const UserBottom = () => {
    //          state: 페이지 네이션 관련 상태          //
    const {
      currentPage,
      currentSection,
      viewList,
      viewPageList,
      totalSection,
      setCurrentPage,
      setCurrentSection,
      setTotalList,
    } = usePagination<BoardListItem>(5);
    //          state: 유저 게시물 개수 상태          //
    const [count, setCount] = useState<number>(0);
    //          state: 유저 게시물 리스트 상태          //
    const [specificUserBoardList, setSpecificUserBoardList] = useState<
      BoardListItem[]
    >([]);

    //          function: get User Board List Response 처리 함수          //
    const getUserBoardListResponse = (
      responseBody: GetUserBoardListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      const { userBoardList } = responseBody as GetUserBoardListResponseDto;
      setSpecificUserBoardList(userBoardList);
      setTotalList(userBoardList);
      setCount(userBoardList.length);
    };

    //          event handler: 글쓰기 클릭 이벤트 처리          //
    const onBoardWriteClickHandler = () => {
      Navigate(BOARD_PATH() + "/" + BOARD_WRITE_PATH());
    };

    //          event handler: 내 게시물로 가기 클릭 이벤트 처리          //
    const onMyBoardListClickHandler = () => {
      if (!loginUser) return;
      Navigate(USER_PATH(loginUser.email));
    };

    //          effect: 첫 마운트 시 실행될 함수          //
    useEffect(() => {
      if (!userEmail) return;
      getUserBoardListRequest(userEmail).then(getUserBoardListResponse);
    }, [userEmail]);

    //          render:유저메인 화면 하단 컴포넌트 렌더링         //
    return (
      <div id="user-bottom-wrapper">
        <div className="user-bottom-container">
          <div className="user-bottom-title-box">
            {userEmail === loginUser?.email ? (
              <div className="user-bottom-title">{`내 게시물 `}</div>
            ) : (
              <div className="user-bottom-title">{`${writerNickname} 님의 게시물 `}</div>
            )}
            <div className="user-bottom-count">{count}</div>
          </div>
          <div className="user-bottom-content-box">
            {count === 0 ? (
              <div className="user-bottom-content-nothing">
                {"게시물이 없습니다."}
              </div>
            ) : (
              <div className="user-bottom-content">
                {viewList.map((item) => (
                  <BoardItem boardListItem={item} />
                ))}
              </div>
            )}
            <div className="user-bottom-right-box">
              {loginUser?.email === undefined && (
                <div className="user-bottom-right-card">
                  <div
                    className="user-bottom-right-card-container"
                    onClick={onBoardWriteClickHandler}
                  >
                    <div className="user-bottom-right-card-title">{`목록으로 돌아가기`}</div>
                  </div>
                </div>
              )}
              {loginUser?.email !== undefined &&
                loginUser?.email !== userEmail && (
                  <div className="user-bottom-right-card">
                    <div
                      className="user-bottom-right-card-container"
                      onClick={onMyBoardListClickHandler}
                    >
                      <div className="user-bottom-right-card-title">{`내 게시물로 가기`}</div>
                      <div className="icon-box">
                        <div className="icon arrow-right-icon"></div>
                      </div>
                    </div>
                  </div>
                )}
              {loginUser?.email === userEmail && (
                <div className="user-bottom-right-card">
                  <div
                    className="user-bottom-right-card-container"
                    onClick={onBoardWriteClickHandler}
                  >
                    <div className="icon-box">
                      <div className="icon edit-light-icon"></div>
                    </div>
                    <div className="user-bottom-right-card-title">{`글쓰기`}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="user-bottom-pagination-box">
            {count !== 0 && (
              <Pagination
                currentPage={currentPage}
                currentSection={currentSection}
                setCurrentPage={setCurrentPage}
                setCurrentSection={setCurrentSection}
                viewPageList={viewPageList}
                totalSection={totalSection}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  //          render: 유저 화면 컴포넌트 렌더링         //
  return (
    <>
      <UserTop />
      <UserBottom />
    </>
  );
}
