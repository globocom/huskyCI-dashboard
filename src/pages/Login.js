/*
  Copyright 2019 Globo.com authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitlab, faGithub } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "../components/LoginButton";
import logo from "../logo.png";

const colorBackground = "black";
const colorBackgroundBox = "gray";

const boxSizeWidth = 400;
const boxSizeHeight = 260;

export const Login = () => {
  return (
    <div
      style={{
        margin: 0,
        width: "100%",
        height: "100vh",
        background: colorBackground,
        position: "relative",
      }}
    >
      <div
        style={{
          width: boxSizeWidth,
          height: boxSizeHeight,
          background: colorBackgroundBox,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "8px",
        }}
      >
        <div>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{
              maxWidth: "20%",
              height: "auto",
              display: "block",
              borderRadius: "50%",
              margin: "3vh auto 3vh auto",
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              display: "block",
              width: "100%",
              height: "100%",
            }}
          >
            <LoginButton
              backgroundColorIcon="#50c94b"
              backgroundColorText="#45b356"
              icon={<FontAwesomeIcon icon={faGithub} />}
              text="GitHub"
              link="#"
            />
          </div>

          <div
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              padding: "15px 0 15px 0",
            }}
          >
            <LoginButton
              backgroundColorIcon="#2e62d2"
              backgroundColorText="#265dca"
              icon={<FontAwesomeIcon icon={faGitlab} />}
              text="GitLab"
              link="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
