import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import dotenv from "dotenv";
dotenv.config(); // Load the environment variables

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
