import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";

const mapStateToProps = state => {
  return {
    error_message: state.get("Error").get("error_message")
  };
};

@connect(mapStateToProps, null)
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errorImg: "//s1.meituan.net/bs/fe-web-meituan/2d53095/img/not-found.png",
      message: "抱歉，页面暂时无法访问... "
    };
  }

  render() {
    const { error_message } = this.props;
    return (
      <div className="error-container">
        <img src={this.state.errorImg} alt="" />
        <p className="error-word">{this.state.message}</p>
        <p className="error-msg">{error_message}</p>
        <Link to="/" className="back-to-home">
          返回美团首页
        </Link>
      </div>
    );
  }
}

export default Home;
