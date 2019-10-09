import React from "react";
import GitButton from "../components/GitButton";
import "./Login.css";

const LoginScreen = () => (
  <div className="center-box">
    <h1 className="center-box__title-box">Start Building</h1>
    <GitButton
      type="GitHub"
      backgroundIcon="#00c949"
      background="#02b355"
      title="Log In with GitHub"
      arrow
    />
    <GitButton
      type="Bitbucket"
      backgroundIcon="#2d63d2"
      background="#1d46ca"
      title="Log In with Bitbucket"
      arrow={false}
    />
  </div>
);

export default LoginScreen;
