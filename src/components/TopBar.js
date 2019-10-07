import React, { Component } from 'react';
import './TopBar.css';
import logo from '../logoTopBar.png';

class TopBar extends Component {
  constructor() {
    super();
    // TODO: Replace these information by the one returned from the OpenID api
    this.state = {
      picture: 'https://avatars2.githubusercontent.com/u/1298871?s=40&v=4',
      name: 'Thiago Coimbra Lemos',
      username: 'tclemos',
    };
  }

  render() {
    const { picture, name, username } = this.state;

    return (
      <div className="top-bar">
        <div className="logo-container">
          <img className="logo" src={logo} alt="huskyCI" />
        </div>
        <div className="menu-container">
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </div>
        <div className="user-container">
          <div className="user-info">
            <div className="user-username">
              {username}
            </div>
            <div className="user-name">
              {name}
            </div>
          </div>
          <div className="user-picture-container">
            <img className="user-picture" src={picture} alt={`Profile of ${name}`} />
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
