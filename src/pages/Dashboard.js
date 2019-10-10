/*
  Copyright 2019 Globo.com authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/

import React from 'react';
import Dashboard from './../components/Dashboard';
import logo from './../logo.png';

const DashboardPage = () =>
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div>
      <Dashboard />
    </div>
  </div>

export default DashboardPage