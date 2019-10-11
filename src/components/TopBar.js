import React, { Component } from "react";
import "./TopBar.css";
import logo from "../logo.png";

class TopBar extends Component {
  constructor() {
    super();
    this.state = {
      picture: "https://avatars1.githubusercontent.com/u/83798?s=40&v=4",
      name: "huskyCI Dashboard",
      username: "huskyCI",
    };
  }

  render() {
    const { picture, name, username } = this.state;

    return (
      <div className="top-bar">
        <div className="logo-container">
          <img className="logo" src={logo} alt="huskyCI" />
        </div>
        <div className="menu-container" />
        <div className="user-container">
          <div className="user-info">
            <div className="user-username">{username}</div>
            <div className="user-name">{name}</div>
          </div>
          <div className="user-picture-container">
            <img
              className="user-picture"
              src={picture}
              alt={`Profile of ${name}`}
            />
          </div>
          <div className="user-menu">
            <ul>
              <li>
                <a href="#profile">Profile</a>
              </li>
              <li>
                <a href="#sign-out">Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
