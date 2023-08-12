import React, { useEffect, useState } from "react";
import "./CustomAlert.css";

const CustomAlert = ({ message, showAlert }) => {
  const [isAlertShown, setIsAlertShown] = useState(showAlert);

  useEffect(() => {
    setIsAlertShown(showAlert);

    if (showAlert) {
      const timer = setTimeout(() => {
        setIsAlertShown(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  return (
    <div className={`custom-alert ${isAlertShown ? "show" : ""}`}>
      <p>{message}</p>
    </div>
  );
};

export default CustomAlert;
