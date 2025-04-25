"use client";

import React, { useState, useEffect } from "react";

type LoadingBarProps = {
  isContent?: boolean;
  text?: string;
  isFull?: boolean;
};

const ActivityIndicator: React.FC<LoadingBarProps> = ({
  isContent = false,
  text = "Loading...",
  isFull = false,
}) => {
  const [loadingBarWidth, setLoadingBarWidth] = useState("0");

  useEffect(() => {
    const startLoadingBar = () => {
      setLoadingBarWidth("100%");
    };

    const stopLoadingBar = () => {
      setLoadingBarWidth("0%");
    };

    startLoadingBar();

    // Simulating asynchronous behavior with setTimeout
    const timeoutId = setTimeout(() => {
      stopLoadingBar();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {isContent ? (
        <div className={`is-loading ${isFull && "full"}`}>
          <span>{text}</span>
          <div className="progress-loading">
            <div className="indeterminate"></div>
          </div>
        </div>
      ) : (
        <div
          className="progress-loading"
          id="loading-bar"
          style={{ width: loadingBarWidth }}
        >
          <div className="indeterminate"></div>
        </div>
      )}
    </>
  );
};

export default ActivityIndicator;
