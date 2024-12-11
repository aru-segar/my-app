import React from "react";
import ConfigurationForm from "./components/configuration/ConfigurationForm";
//import "./styles/ConfigurationForm.css";
import Header from "./components/header/Header";
//import "./styles/Header.css";
import CustomerVendorManagement from "./components/customer-vendor-management/CustomerVendorManagement";
//import "./styles/CustomerVendorManagement.css";
import ProgressBar from "./components/progress-bar/ProgressBar";
import StartStopSystem from "./components/start-stop-system/StartStopSystem";
import Console from "./components/console/Console";
import LineChart from "./components/line-chart/LineChart";
import "./components/responsive.css";

const App = () => {
  return (
    <div className="App">
      <Header>
        <StartStopSystem />
      </Header>
      <ConfigurationForm />
      <CustomerVendorManagement />
      <ProgressBar />
      <LineChart />
      <Console />
    </div>
  );
};

export default App;
