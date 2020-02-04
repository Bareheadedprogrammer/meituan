import React, { PureComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./common/header";
import { Provider } from "react-redux";
import Home from "./component/Home";
import Error from "./component/404";
import FooterNav from "./component/footerNav";
import Footer from "./component/footer";
import Login from "./component/login";
import Search from "./component/search";
import Meishi from "./component/detail/meishi";
import Cate from "./component/detail/cate";
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
              <Route path="/s/:content" component={Search}></Route>
              <Route path="/meishi/:id" component={Meishi}></Route>
              <Route path="/cate/:id" component={Cate}></Route>
              <Route path="*" component={Error} />
            </Switch>
            <FooterNav />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
