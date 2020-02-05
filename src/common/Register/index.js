import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import "./index.less";

class index extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.form.getFieldsValue());
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 7 }
    };
    return (
      <div className="pg-unitive-signup">
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
        <div className="content">
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit}
            className="login-form"
          >
            <Form.Item label="手机号">
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
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="手机号"
                />
              )}
              <Button>获取验证码</Button>
            </Form.Item>
            <Form.Item label="动态验证码">
              {getFieldDecorator("code", {
                rules: [
                  { len: 6, message: "请输入手机的验证码" },
                  {
                    required: true,
                    message: "验证码不能为空"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="动态验证码"
                />
              )}
            </Form.Item>
            <Form.Item label="请输入密码">
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
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item label="再次输入密码">
              {getFieldDecorator("rePassword", {
                rules: [{ required: true, message: "请在此输入一遍密码" }]
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
            <Form.Item className="quxiaoLabel" label=" ">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                同意以下协议并且注册
              </Button>
            </Form.Item>
            <Form.Item className="quxiaoLabel" label=" ">
              <div className="term">
                <Link to="/loading">《美团点评用户服务协议》</Link>
                <Link to="/loading">《美团点评隐私政策》</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: "normal_login" })(index);
