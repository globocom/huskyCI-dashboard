/*
  Copyright 2019 Globo.com authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/

import React from 'react';

const LoginButton = ({ backgroundColorIcon, backgroundColorText, icon, text, link }) =>
  <div 
    style={{
      width: '80%',
      height: '55px',
      padding: 0,
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
        position: 'absolute',
        fontSize: '30px'
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
        left: '96px',
      }}>
        Log In with {text}
      </div>
    </a>
  </div>

export default LoginButton;
