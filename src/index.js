import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import "./interceptor.js";
import "antd/dist/antd.css";
import "antd-mobile/dist/antd-mobile.css";
import "./static/font/iconfont.css";
import App from './route';

ReactDOM.render(<App />, document.getElementById('root'));