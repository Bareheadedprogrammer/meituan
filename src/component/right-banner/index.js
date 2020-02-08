import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Banner from "../banner";
import { connect } from "react-redux";
import "./index.less";

@connect(state => {
  return {
    isLogin: state.get("Header").get("isLogin")
  };
}, null)
class index extends Component {
  render() {
    const { isLogin } = this.props;
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
              {isLogin ? (
                <div className="default">
                  <div className="setting">
                    <Link to="/account/settings">
                      <span className="iconfont icon-shezhi"></span>
                    </Link>
                  </div>
                  <div className="head-img-row">
                    <Link to="/account/userinfo">
                      <img
                        src="https://img.meituan.net/avatar/4ba9758be0a301ef9e3d8f45e472b1563720.jpg"
                        alt="头像"
                      />
                    </Link>
                  </div>
                  <div className="nickname-row">
                    <Link to="/account/userinfo">
                      <p className="user-name">
                        {JSON.parse(localStorage.getItem("userinfo")).name}
                      </p>
                    </Link>
                    <Link to="/account/userinfo">
                      <span className="iconfont icon-v2 iconfont iconfont_level icon-lable_level_2"></span>
                    </Link>
                  </div>
                  <div className="fn-row clearfix">
                    <div className="fn-item">
                      <Link to="/orders">
                        <div className="icon">
                          <span className="iconfont icon-dingdan"></span>
                        </div>
                        <p className="fn-name">我的订单</p>
                      </Link>
                    </div>
                    <div className="fn-item">
                      <Link to="/collections">
                        <div className="icon">
                          <span className="iconfont icon-shoucang"></span>
                        </div>
                        <p className="fn-name">我的收藏</p>
                      </Link>
                    </div>
                    <div className="fn-item">
                      <Link to="/vouchers">
                        <div className="icon">
                          <span className="iconfont icon-icon_A"></span>
                        </div>
                        <p className="fn-name">抵用券</p>
                      </Link>
                    </div>
                  </div>
                  <div className="fn-row clearfix">
                    <div className="fn-item">
                      <Link to="/account/userinfo">
                        <div className="icon">
                          <span className="iconfont icon-yue"></span>
                        </div>
                        <p className="fn-name">余额</p>
                      </Link>
                    </div>
                    <div className="fn-item">
                      <Link to="/account/userinfo">
                        <div className="icon">
                          <span className="iconfont icon-gengduo"></span>
                        </div>
                        <p className="fn-name">更多</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
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
              )}
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
            <p className="app-name">美团APP手机版</p>
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
