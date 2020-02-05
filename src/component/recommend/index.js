import React, { PureComponent } from "react";
import data from "../../config/recommend.json";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getReData } from "../store/createAction";
import "./index.less";

const mapStateToProps = state => {
  return {
    list: state.get("Home").get("reData")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData(data) {
      dispatch(getReData(data));
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Home extends PureComponent {
  componentDidMount = () => {
    if (this.props.list.size === 0) {
      this.props.getData("all");
    }
  };

  render() {
    const { list } = this.props;
    let defaultList = list.toJS();
    let shuzu = null;
    if (defaultList.length === 1) {
      shuzu = defaultList[0].data;
    } else {
      shuzu = [];
    }
    return (
      <div className="scenes-container">
        <div className="quality-container">
          <div
            className="index-nav-container undefined"
            style={{
              background:
                "linear-gradient(to right, rgb(88, 174, 221) 2%, rgb(66, 191, 205) 97%) rgb(88, 174, 221)"
            }}
          >
            <ul className="clearfix ">
              <li className="title nav-item mf-shang-hei-regular">猜你喜欢</li>
              {data.data.map((item, index) => {
                return (
                  <li className="active nav-item" key={index}>
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="recommend-list">
            {shuzu.map(item => {
              return (
                <Link
                  className="link link recommend-item"
                  to={{ pathname: `meishi/${item.itemId}` }}
                  key={item.itemId}
                >
                  <div className="card-container">
                    <div className="recommend-card-wrapper">
                      <div className="img-box">
                        <img src={item.imgUrl} alt={item.title} />
                      </div>
                      <div className="info-box">
                        <div className="title aligned" title={item.title}>
                          {item.title}
                        </div>
                        <div className="score-line aligned">
                          <div className="score">
                            <div className="rate-stars">
                              <ul className="rate-stars-ul rate-stars-dark">
                                <li>
                                  <span className="icon-star_full iconfont"></span>
                                </li>
                                <li>
                                  <span className="icon-star_full iconfont"></span>
                                </li>
                                <li>
                                  <span className="icon-star_full iconfont"></span>
                                </li>
                                <li>
                                  <span className="icon-star_full iconfont"></span>
                                </li>
                                <li>
                                  <span className="icon-star_full iconfont"></span>
                                </li>
                              </ul>
                              <ul
                                className="rate-stars-ul rate-stars-light"
                                style={{ width: item.score * 20 + "%" }}
                              >
                                <li>
                                  <span className="icon-star_full iconfont"></span>
                                </li>
                                <li>
                                  <span className="icon-star_full iconfont"></span>
                                </li>
                                <li>
                                  <span className="icon-star_full iconfont"></span>
                                </li>
                                <li>
                                  <span className="icon-star_full iconfont"></span>
                                </li>
                                <li>
                                  <span className="icon-star_full iconfont"></span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="comment-number">
                            {item.commentNum}个评价
                          </div>
                        </div>
                        <div className="desc-line aligned">
                          <div className="desc">{item.areaName}</div>
                        </div>
                        <div className="bottom-line aligned">
                          <div className="price-box">
                            <span>
                              <span className="yuan">￥</span>
                              <span className="price-number numfont">
                                {item.lowPrice}
                              </span>
                              <span className="price-desc">起</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
