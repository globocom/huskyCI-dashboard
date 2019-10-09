import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import DashboardScreen from "./screens/Dashboard";
import LoginScreen from "./screens/Login";

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/" exact component={DashboardScreen} />
      </div>
    </Router>
  </Provider>
);

export default App;
