import React, { Component, Fragment } from "react";
import Header from "./common/header";
import FooterNav from "./common/footer/footerNav";
import Footer from "./common/footer/footer";

// 首页容器组件
class app extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        {this.props.children}
        <FooterNav />
        <Footer />
      </Fragment>
    );
  }
}

export default app;
