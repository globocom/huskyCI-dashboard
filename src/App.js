/*
  Copyright 2019 Globo.com authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/

import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import TopBar from './components/TopBar';

const App = () => (
  <div className="App">
    <TopBar />
    <div>
      <Dashboard />
    </div>
  </div>
);

export default App;
