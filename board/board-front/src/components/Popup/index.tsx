import React from "react";
import "./style.css";
import { User } from "types/interface";

interface PopupProps {
  user: User;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ user, onClose }) => {
  const onCloseButtonClickHandler = () => {};

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <span className="popup-close" onClick={onClose}>
            &times;
          </span>
          <div className="popup-user-info">
            <div className="popup-user-info-email">
              <div className="popup-user-info-title"></div>
              <div className="popup-user-info-content">{user.email}</div>
            </div>
            <div className="popup-user-info-nickname">
              <div className="popup-user-info-title"></div>
              <div className="popup-user-info-content">{user.nickname}</div>
            </div>
            <div className="popup-user-info-profileImage">
              <div className="popup-user-info-title"></div>
              <div className="popup-user-info-content">{user.profileImage}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
