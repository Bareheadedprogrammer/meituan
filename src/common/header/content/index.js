import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import "./index.less";

class Content extends PureComponent {
  render() {
    return (
      <div className="header-content">
          <div className="header-title-module">
              <Link to="/">
                  <img alt="美团首页" src={require("../../../static/logo.png")}></img>
              </Link>
          </div>
          <div className="header-search-module">
            <div className="header-search-block">
                <input type="text" className="header-search-input" placeholder="搜索商家或地点" />
                <button className="header-search-btn">
                  <span className="icon-sousuo iconfont"></span>
                </button>
            </div>
          </div>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {};

// const mapStateToProps = state => {

// };

export default connect(null, null)(Content);
