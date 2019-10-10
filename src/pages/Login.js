/*
  Copyright 2019 Globo.com authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/

import React, { Component } from 'react';
import LoginButton from '../components/LoginButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitbucket, faGithub } from '@fortawesome/free-brands-svg-icons';

const colorBackground = '#e6dbdb';
const colorBackgruondBox = '#3d4572';

const boxSizeWidth = 400;
const boxSizeHeight = 260;

export default class Login extends Component {
  render() {
    return (
      <div style={{ 
        margin: 0, 
        width: '100%', 
        height: '100vh', 
        background: colorBackground, 
        position: 'relative' 
      }}>
        <div style={{ 
          width: boxSizeWidth, 
          height: boxSizeHeight, 
          background: colorBackgruondBox, 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          borderRadius: '8px'
        }}>
          <div>
            <h2 style={{ 
              color: '#fff', 
              fontSize: '25px', 
              padding: '8px 0 10px 0',
              textAlign: 'center'
            }}>Start building!</h2>
          </div>
          <div style={{
            width: '100%'
          }}>
            <div style={{
              display: 'block',
              width: '100%',
              height: '100%'
            }}>
              <LoginButton 
                backgroundColorIcon='#50c94b'
                backgroundColorText='#45b356'
                icon={<FontAwesomeIcon icon={faGithub} />}
                text='GitHub'
                link='#'
              />
            </div>

            <div style={{
              display: 'block',
              width: '100%',
              height: '100%',
              padding: '15px 0 15px 0'
            }}>
              <LoginButton 
                backgroundColorIcon='#2e62d2'
                backgroundColorText='#265dca'
                icon={<FontAwesomeIcon icon={faBitbucket} />}
                text='Bitbucket'
                link='#'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
