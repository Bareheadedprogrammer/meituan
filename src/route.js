import React, { PureComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./common/header";
import { Provider } from "react-redux";
import Home from "./component/Home";
import Error from "./component/404";
import Login from "./component/login";
import store from "./store/store";

// 路由配置
export default class route extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="*" component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
