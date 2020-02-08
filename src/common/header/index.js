import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Right from "./header-right";
import HeaderContent from "./content";
import { Modal } from "antd";
import { clearSignout } from "../store/createAction";
import "./index.less";

const mapStateToProps = state => {
  return {
    isLogin: state.get("Header").get("isLogin"),
    city: state.get("Header").get("city")
  };
};

@connect(mapStateToProps, dispatch => {
  return {
    qingchu() {
      dispatch(clearSignout());
    }
  };
})
class Header extends PureComponent {
  state = { visible: false };
  handleOk = e => {
    this.setState({
      visible: false
    });
    this.props.qingchu();
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { city, isLogin } = this.props;
    return (
      <div className="com-header">
        <Modal
          title="注销账号"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="退出"
          cancelText="取消"
        >
          <p>你确定要退出登录吗?</p>
        </Modal>
        <div className="header-bar">
          <div className="header-bar-container">
            <div className="header-bar-left">
              <span className="icon-dingwei iconfont myIcon"></span>
              <span className="header-city">{city}</span>
              <Link to="/changecity" className="changecity">
                切换城市
              </Link>
              <div className="user-login">
                {isLogin ? (
                  <Fragment>
                    <Link to="/userinfo" className="header-login">
                      {JSON.parse(localStorage.getItem("userinfo")).name}
                    </Link>
                    <span
                      onClick={() => {
                        this.setState({
                          visible: true
                        });
                      }}
                      className="header-register zhizhen"
                    >
                      退出
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link to="/login" className="header-login">
                      立即登录
                    </Link>
                    <Link to="/register" className="header-register">
                      注册
                    </Link>
                  </Fragment>
                )}
              </div>
            </div>
            <div className="header-bar-right">
              <Right />
            </div>
          </div>
        </div>
        <HeaderContent />
      </div>
    );
  }
}

export default Header;
