import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import "./interceptor.js";
import "antd/dist/antd.css";
import "antd-mobile/dist/antd-mobile.css";
import App from "./route";
// import "./utils/pc";

ReactDOM.render(<App />, document.getElementById("root"));
