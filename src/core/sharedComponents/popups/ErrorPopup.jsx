import React, { useState, useEffect } from "react";
import "../../../styles/errorPopupStyle.scss";
import { CircleAlert } from "lucide-react";

const ErrorPopup = ({ message, onClose, timeOut }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const fadeClass = fadeOut ? "fade-out" : "fade-in";

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), timeOut * 1000 - 300);
    const closeTimer = setTimeout(() => onClose(), timeOut * 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [timeOut, onClose]);

  return (
    <div id="ErrorPopupContainer" className={fadeClass}>
      <div id="messageContainer">
        <CircleAlert color="red" id="icon" />
        <p>Error: {message}</p>
      </div>
      <button id="PopupCloseButton" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ErrorPopup;