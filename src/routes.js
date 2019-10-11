/*
  Copyright 2019 Globo.com authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
*/

import React from 'react';
import { 
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';

const Routes = () => 
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={DashboardPage} />
      <Route path="/login" exact component={LoginPage} />
    </Switch>
  </BrowserRouter>

export default Routes