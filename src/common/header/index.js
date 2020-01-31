import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./index.less";

class Header extends PureComponent {
  render() {
    const { city } = this.props;
    return (
      <div>
        <div className="header-bar">
          <div className="header-bar-container">
            <div className="header-bar-left">
              <span className="icon-dingwei iconfont myIcon"></span>
              <span className="header-city">{city}</span>
              <Link to="/changecity" className="changecity">
                切换城市
              </Link>
              <div className="user-login">
                <Link to="/login" className="header-login">
                  立即登录
                </Link>
                <Link to="/register" className="header-register">
                  注册
                </Link>
              </div>
            </div>
            <div className="header-bar-right">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {};

const mapStateToProps = state => {
  return {
    isLogin: state.get("Header").get("isLogin"),
    city: state.get("Header").get("city")
  };
};

export default connect(mapStateToProps, null)(Header);
