/* eslint-disable react/prop-types */
import React from "react";
import "./GitButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitbucket, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const GitButton = ({ type, backgroundIcon, background, title, arrow }) => {
  return (
    <div className="button" style={{ background }}>
      <div className="button__icon" style={{ background: backgroundIcon }}>
        <FontAwesomeIcon
          size="lg"
          icon={type === "GitHub" ? faGithub : faBitbucket}
          color="#ddd"
        />
      </div>
      <span
        className="button__title"
        style={{
          color: "#ffffff",
        }}
      >
        {title}
      </span>
      {arrow && (
        <FontAwesomeIcon
          className="button__arrow"
          size="sm"
          icon={faAngleDown}
          color="#ddd"
        />
      )}
    </div>
  );
};

export default GitButton;
