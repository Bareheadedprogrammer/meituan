import React, { PureComponent } from "react";
import data from "../../config/banner-left.json";
import { Link } from "react-router-dom";
import RightBanner from '../right-banner';
import "./index.less";

class Home extends PureComponent {
  render() {
    return (
      <div className="banner-container clearfix">
        <div className="left-banner">
          <div className="category-nav-container">
            <div className="category-nav-title-wrapper">
              <span className="category-nav-title">全部分类</span>
            </div>
            <div className="category-nav-content-wrapper">
              <ul>
                {data.data.map((item, index) => {
                  return (
                    <li key={index} className="nav-li">
                      <i className={[item.icon,"iconfont"].join(" ")}></i>
                      <span className="nav-text-wrapper">
                        {item.title.map((i, d) => {
                          return (
                            <span key={d}>
                              <Link className="nav-text" to={i}>{i}
                                {
                                  item.hot&&(<span className="nav-promotion">HOT</span>)
                                }
                              </Link>
                            </span>
                          );
                        })}
                      </span>
                      <i className="nav-right-arrow"></i>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="right-banner">
          <RightBanner />
        </div>
      </div>
    );
  }
}

export default Home;
