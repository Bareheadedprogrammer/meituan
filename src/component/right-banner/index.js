import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Banner from '../banner';
import "./index.less";

class index extends Component {
  render() {
    return (
      <Fragment>
        <div className="home-header-links">
          <Link to="/waimai">美团外卖</Link>
          <Link to="/waimai">猫眼电影</Link>
          <Link to="/waimai">美团酒店</Link>
          <Link to="/waimai">民宿/公寓</Link>
          <Link to="/waimai">商家入驻</Link>
          <Link to="/waimai">美团公益</Link>
        </div>
        <div className="banner-row clearfix">
          <div className="item banner-slider shadow">
              <div className="slider" id="banner-slider">
                <Banner />
              </div>
          </div>
          <Link to="/xiu">
            <div
              className="item shadow pic-1"
              style={{
                backgroundImage:
                  "url(http://p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg)"
              }}
            ></div>
          </Link>
          <div className="item banner-logincard">
            <div className="login-container">
              {/* 登录显示第一个,没登录显示第二个 */}
              <div className="default">
                <div className="head-img-row">
                  <img
                    src="//s0.meituan.net/bs/fe-web-meituan/e350c4a/img/avatar.jpg"
                    alt=""
                  />
                </div>
                <p className="user-name">Hi！你好</p>
                <Link className="btn-login" to="/login">
                  注册
                </Link>
                <Link className="btn-login" to="/register">
                  立即登录
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-row clearfix">
          <Link to="/jiu">
            <div
              style={{
                backgroundImage:
                  "url(http://p1.meituan.net/codeman/8cce56c467a17e04f3094d1e455462a0132772.png"
              }}
              className="item pic-2 shadow"
            ></div>
          </Link>
          <Link to="/jiu">
            <div
              style={{
                backgroundImage:
                  "url(http://p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg"
              }}
              className="item pic-3 shadow"
            ></div>
          </Link>
          <Link to="/jiu">
            <div
              style={{
                backgroundImage:
                  "url(http://p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg"
              }}
              className="item pic-4 shadow"
            ></div>
          </Link>
          <div className="item download-app">
              <div className="qrcode-box">
                  <div>app正在开发中</div>
              </div>
              <p className="app-name">
              美团APP手机版
              </p>
              <p className="sl">
                  <span className="red">1元起</span>
                  <span className="gary">吃喝玩乐</span>
              </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default index;
