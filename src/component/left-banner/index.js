import React, { PureComponent } from "react";
import data from "../../config/banner-left.json";
import list from "../../config/banner.json";
import { Link } from "react-router-dom";
import RightBanner from "../right-banner";
import "./index.less";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detail: false,
      more: 0
    };
  }

  showDetail(data) {
    this.setState({
      detail: data
    });
  }

  showDetailShow(index){
    this.setState({
      more: index
    });
  }

  render() {
    return (
      <div className="banner-container clearfix">
        <div className="left-banner">
          <div className="category-nav-container">
            <div className="category-nav-title-wrapper">
              <span className="category-nav-title">全部分类</span>
            </div>
            <div
              onMouseEnter={() => this.showDetail(true)}
              onMouseLeave={() => this.showDetail(false)}
              className="category-nav-content-wrapper"
            >
              <ul>
                {data.data.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="nav-li"
                      onMouseEnter={() => this.showDetailShow(index)}
                    >
                      <i className={[item.icon, "iconfont"].join(" ")}></i>
                      <svg className="icon" aria-hidden="true">
                          <use xlinkHref="icon-meirong"></use>
                      </svg>
                      <span className="nav-text-wrapper">
                        {item.title.map((i, d) => {
                          return (
                            <span key={d}>
                              <Link className="nav-text" to={i}>
                                {i}
                                {item.hot && (
                                  <span className="nav-promotion">HOT</span>
                                )}
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
            <div
              onMouseEnter={() => this.showDetail(true)}
              onMouseLeave={() => this.showDetail(false)}
              className={[
                "category-nav-detail-wrapper",
                this.state.detail && "active"
              ].join(" ")}
            >
              {list.data.map((item, index) => {
                return (
                  <div key={index} className={["category-nav-detail",this.state.more === index && "active"].join(" ")}>
                    {item.list.map((i, d) => {
                      return (
                        <div key={d} className="detail-area">
                          <div className="detail-title-wrapper clearfix">
                            <h2>
                              <Link to={i.url} className="link detail-title">{i.title}</Link>
                            </h2>
                            <Link to={i.url} className="link detail-more">
                              更多
                              <i className="detail-right-arrow"></i>
                            </Link>
                          </div>
                          <div className="detail-content">
                            {
                              i.children.map((ind,dx)=>{
                                return <Link key={dx} to={i.url} className="link detail-text">{ind.title}</Link>
                              })
                            }
                      
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
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
