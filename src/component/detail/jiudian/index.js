import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./index.less";

class Jiudian extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  isShowToHide = () => {
    this.setState({
      show: false
    });
  };

  render() {
    return (
      <div id="poiDetail">
        <div className="site-wrapper-wide">
          <div className="site-wrapper">
            <div className="breadcrumb-nav">
              酒店
              <span className="breadcrumb-divider">></span>
            </div>
          </div>
        </div>
        {this.state.show && (
          <div className="shadow-bg" data-v-51136ade>
            <div className="mp-container">
              <img
                src="https://p1.meituan.net/travelcube/78b91e51ff6f7e6e5e91b769ec2413272788.png"
                className="logo"
                alt="图"
              />
              <div className="intro">
                <p className="intro-title">美团酒店小程序</p>
                <p className="intro-desc">
                  <span className="left-text">随时订</span>
                  <span className="right-text">更方便</span>
                </p>
              </div>
              <div className="mp">
                <div className="scan-code qrcode">小程序正在开发中</div>
                <img
                  className="mp-code"
                  src="https://p0.meituan.net/travelcube/ce83f11af2812946a1bf8d3c995ddc7094277.jpg"
                  alt="微信小程序"
                />
              </div>
              <div className="app">
                <div className="scan-code qrcode">APP正在开发中</div>
                <img
                  className="mp-code"
                  src="https://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:d5896c44/touch/css/download/i/qr-code_v2.png"
                  alt="微信小程序"
                />
              </div>
            </div>
            <div className="close-btn" onClick={this.isShowToHide}>
              +
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(Jiudian);
