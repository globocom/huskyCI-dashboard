import React, { Component } from 'react';

const LoginButton = ({ backgroundColorIcon, backgroundColorText, icon, text, link }) =>
  <div 
    style={{
      width: '80%',
      height: '55px',
      padding: 0,
      margin: 0,
      background: backgroundColorText,
      borderRadius: '3px',
      cursor: 'pointer',
      position: 'relative',
      display: 'block',
      margin: '0 auto'
    }}
  >
    <a href={link} style={{ color: '#fff' }}>
      <div style={{
        width: '25%',
        height: '100%',
        background: backgroundColorIcon,
        borderRadius: '3px',
        position: 'absolute'
      }}>
        <span style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%,-50%)', 
        }}>
          {icon}
        </span>
      </div>
      <div style={{
        width: '75%',
        height: '100%',
        position: 'absolute',
        top: '37%',
        left: '45px',
      }}>
        Log In with {text}
      </div>
    </a>
  </div>

export default LoginButton;
