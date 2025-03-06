import React, { useEffect } from "react";
import "./style.css";
import { useLoginUserStore } from "stores";

//          component: 푸터 레이아웃          //
export default function Footer() {
  //          state: 로그인 유저 상태         //
  const { loginUser, resetLoginUser } = useLoginUserStore();

  //          event handler: 인스타 아이콘 버튼 클릭 이벤트 처리         //
  const onInstaIconButtonClickHandler = () => {
    window.open("https://www.instagram.com");
  };

  //          event handler: 네이버 블로그 아이콘 버튼 클릭 이벤트 처리         //
  const onNaverBlogIconButtonClickHandler = () => {
    window.open("https://blog.naver.com");
  };

  //          event handler: E-mail Link 버튼 클릭 이벤트 처리         //
  const onEmailIconButtonClickHandler = () => {
    window.open("http://www.becomesolution.com/");
  };

  //          effect : 로그인 유저 변경될 때 마다 실행될 함수         //
  useEffect(() => {
    if (loginUser === null) {
      resetLoginUser();
    }
  }, [loginUser]);

  //          render: 푸터 레이아웃 렌더링         //
  return (
    <div id="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-box">
            <div className="icon-box">
              <div className="icon logo-light-icon"></div>
            </div>
            <div className="footer-logo-text">{`Become Board`}</div>
          </div>
          <div className="footer-link-box">
            <div
              className="footer-email-link"
              onClick={onEmailIconButtonClickHandler}
            >
              {loginUser?.email}
            </div>
            <div
              className="icon-button"
              onClick={onInstaIconButtonClickHandler}
            >
              <div className="icon insta-icon"></div>
            </div>
            <div
              className="icon-button"
              onClick={onNaverBlogIconButtonClickHandler}
            >
              <div className="icon naver-blog-icon"></div>
            </div>
          </div>
        </div>
        <div className="footer-botton">
          <div className="footer-copyright">{`Copyright ⓒ 2025 BECOME SOLUTION. All Rights Reserved`}</div>
        </div>
      </div>
    </div>
  );
}
