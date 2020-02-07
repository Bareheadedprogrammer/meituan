import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Steps, Button, Input, Icon } from "antd";
import {
  getPhoneRe,
  getPhoneResult,
  getPhoneValue,
  getYanCode,
  getUserInfo
} from "../store/createAction";
import { connect } from "react-redux";
import "./index.less";

const { Step } = Steps;

@connect(
  state => {
    return {
      isLogin: state.get("Header").get("isLogin"),
      re: state.get("Header").get("re"),
      yan: state.get("Header").get("yan")
    };
  },
  dispatch => {
    return {
      chaPhone(phone) {
        dispatch(getPhoneRe(phone));
      },
      chaPhoneRe(data) {
        dispatch(getPhoneResult(data));
      },
      fayanzhengma(data) {
        dispatch(getPhoneValue(data));
      },
      yanCode(code) {
        dispatch(getYanCode(code));
      },
      getRegister(obj) {
        dispatch(getUserInfo(obj));
      }
    };
  }
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      tel: "",
      pan: true,
      yanCode: ""
    };
  }

  //确认密码校验一致
  handleCfmPwd(rules, value, callback) {
    let loginpass = this.props.form.getFieldValue("password");
    if (loginpass && loginpass !== value) {
      callback(new Error("两次密码输入不一致"));
    } else {
      callback();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.code = this.state.yanCode;
        values.gai = 1;
        values.tel = this.state.tel;
        this.props.getRegister(values);
      }
    });
  };

  DemoClickYan = event => {
    this.setState({
      yanCode: event.target.value
    });
    if (event.target.value.length === 6) {
      this.props.yanCode(event.target.value);
    }
  };

  nextSetup = () => {
    // 如果是第二次,进行验证
    if (this.state.current === 1) {
    }
    this.setState({
      current: this.state.current + 1
    });
  };

  handlerClickPhone = event => {
    if (/^1[3456789]\d{9}$/.test(event.target.value)) {
      this.props.chaPhone(event.target.value);
      this.setState({
        tel: event.target.value
      });
    } else {
      this.props.chaPhoneRe(false);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { current, tel, pan } = this.state;
    const { isLogin, re, fayanzhengma, yan } = this.props;
    if (current === 1 && pan) {
      fayanzhengma(tel);
      this.setState({
        pan: false
      });
    }
    const steps = [
      {
        title: "确认账号",
        content: (
          <div className="step-1-op" key={0}>
            <div className="step-1-title">请填写你要找回密码的美团账号</div>
            <input
              type="text"
              className="user-input"
              placeholder="手机号/用户名/邮箱"
              maxLength="32"
              onChange={this.handlerClickPhone}
            ></input>
            <Button
              type="primary"
              disabled={!re}
              className="next-step-btn"
              onClick={this.nextSetup}
            >
              下一步
            </Button>
          </div>
        )
      },
      {
        title: "安全校验",
        content: (
          <div className="step-1-op" key={1}>
            <div className="step-1-title">我们已经给您发送验证码,请填写</div>
            <input
              type="text"
              className="user-input"
              placeholder="6位验证码"
              maxLength="32"
              onChange={this.DemoClickYan}
            ></input>
            <Button
              type="primary"
              disabled={!yan}
              className="next-step-btn"
              onClick={this.nextSetup}
            >
              下一步
            </Button>
          </div>
        )
      },
      {
        title: "设置密码",
        content: (
          <div className="step-1-op" key={2}>
            <div className="step-1-title">请填写新密码</div>
            <Form onSubmit={this.handleSubmit}>
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
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="请输入新密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("rePassword", {
                  rules: [
                    { required: true, message: "请在此输入一遍密码" },
                    {
                      validator: (rules, value, callback) => {
                        this.handleCfmPwd(rules, value, callback);
                      }
                    }
                  ]
                })(
                  <Input.Password
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="再次输入密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="next-step-btn"
                  htmlType="submit"
                >
                  下一步
                </Button>
              </Form.Item>
            </Form>
          </div>
        )
      }
    ];

    return (
      <Fragment>
        {isLogin ? <Redirect to="/" /> : null}
        <div className="pg-unitive-signup geren">
          <header className="header--mini">
            <div className="wrapper cf">
              <Link to="/" className="site-logo">
                美团
              </Link>
              <div className="login-block">
                <span className="tip">已有美团账号？</span>
                <Link to="/login" className="btn btn-small login">
                  登录
                </Link>
              </div>
            </div>
          </header>
          <div className="content_neirong">
            <h3 className="headline-content">找回登录密码</h3>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Form.create({ name: "zhao" })(index);
