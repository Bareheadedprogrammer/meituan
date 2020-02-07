import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import { userLoginClick } from "../store/createAction";
import { connect } from "react-redux";
import "./index.less";

@connect(
  state => {
    return {
      isLogin: state.get("Header").get("isLogin")
    };
  },
  dispatch => {
    return {
      isLoginClick(values) {
        dispatch(userLoginClick(values));
      }
    };
  }
)
class index extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && !this.props.re) {
        this.props.isLoginClick(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLogin } = this.props;
    return (
      <Fragment>
        {isLogin ? <Redirect to="/" /> : null}
        <div className="pg-unitive-signup">
          <header className="header cf">
            <Link className="site-logo" to="/"></Link>
          </header>
          <div className="site-body cf">
            <div className="promotion-banner">
              <img
                alt="logo"
                src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
              ></img>
            </div>
            <div className="login-section">
              <div className="validate-info"></div>
              <div className="login-type login-type--normal">
                <span className="login_user_pu">
                  手机动态码登录
                  <span className="iconfont icon-phone"></span>
                </span>
                账号登录
              </div>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("tel", {
                    rules: [
                      { required: true, message: "手机号不能为空" },
                      {
                        pattern: /^1[3456789]\d{9}$/,
                        message: "手机号不符合要求"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="phone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="手机号"
                      onKeyUp={this.getYanShou}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "请输入密码" },
                      {
                        // eslint-disable-next-line no-useless-escape
                        pattern: /^.*(?=.{8,16})(?=.*\d)(?=.*[a-z|A-Z]{1,})(?=.*[!@#\$%\^&\*\?\(\),\.;:'"<>\{\}\[\]\\/\+-=\|_]).*$/,
                        message: "密码长度为8-16,必须有字母,特殊字符,数字"
                      }
                    ]
                  })(
                    <Input.Password
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="请输入密码"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Link className="zhaomim" to="/zhao">
                    忘记密码?
                  </Link>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登录
                  </Button>
                  <div className="quxiaoLabel">
                    <div className="term">
                      还没有账号?
                      <Link to="/loading">免费注册</Link>
                    </div>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div id="footer">
          <address>
            <div className="copyright">
              Copyright&nbsp;&nbsp;©&nbsp;2019-2020{" "}
              <a
                href="http://shtodream.cn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                SH'S BLOG
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <img
                alt=""
                src="https://cdn.jsdelivr.net/gh/TRHX/CDN-for-itrhx.com@2.0.4/images/icp.png"
              />
              <a
                href="http://www.beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                冀ICP备19013084号-1
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <img
                alt=""
                src="https://cdn.jsdelivr.net/gh/TRHX/CDN-for-itrhx.com@2.0.9/images/12377.png"
              />
              <a
                href="http://www.12377.cn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                中国互联网违法和不良信息举报中心
              </a>
            </div>
            <div className="yule">
              搭建使用
              <a
                href="https://react.docschina.org/docs/getting-started.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                React
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 托管于
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 域名解析于
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://cloud.tencent.com/?fromSource=gwzcw.2212127.2212127.2212127&utm_medium=cpd&utm_id=gwzcw.2212127.2212127.2212127"
              >
                腾讯云服务器
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 仿照
              <a
                target="_blank"
                href="https://hrb.meituan.com/"
                rel="noopener noreferrer"
              >
                美团
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 支持996ICU
              <a
                target="_blank"
                href="https://996.icu/#/zh_CN"
                rel="noopener noreferrer"
              >
                996ICU
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 提交次数
              <a target="_blank" href="/" rel="noopener noreferrer">
                168
              </a>
              &nbsp;&nbsp;|&nbsp;&nbsp; 文字总数
              <a target="_blank" href="/" rel="noopener noreferrer">
                67.3k
              </a>
            </div>
            <div className="yule">
              推荐使用Chrome谷歌浏览器1920*1080分辨率&nbsp;&nbsp;|&nbsp;&nbsp;本网站搭建纯属个人爱好,很多样式并非本人所写,如果有问题随时可以留言给我,会在第一时间内即使处理&nbsp;&nbsp;|&nbsp;&nbsp;坚持自己选择计算机的道路!!!
            </div>
          </address>
        </div>
      </Fragment>
    );
  }
}

export default Form.create({ name: "login" })(index);
