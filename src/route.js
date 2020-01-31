import React, { PureComponent } from "react";
import { BrowserRouter } from 'react-router-dom';
import Header from "./common/header";
import { Provider } from 'react-redux';
import Home from './component/Home';
import store from './store/store';

// 路由配置
export default class route extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <Home path="/" />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
