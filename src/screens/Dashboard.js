import React from "react";
import Dashboard from "../components/Dashboard";
import logo from "./logo.png";
import "./Dashboard.css";

const DashboardScreen = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div>
      <Dashboard />
    </div>
  </div>
);

export default DashboardScreen;
