import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getMeiShi } from "../store/createAction";
import { Link } from "react-router-dom";
import "./index.less";
import format from "../../../utils/dateChuli";
import { notification, Icon } from "antd";
import Tail from "../tail";
import Right from "../right";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: "default", // default代表质量排序, limit代表时间排序
      tags: null
    };
  }

  componentDidMount() {
    this.props.getDefaultData(this.props.match.params.id);
  }

  getDoubleData = () => {
    this.props.getDefaultData(this.props.match.params.id);
  };

  clickDoubleSort(sort) {
    this.setState({
      sort
    });
  }

  // 点赞
  addLike = () => {
    notification.open({
      message: "请先登录",
      description: "亲,由于你没有登录,我们无法信息的可靠性,请登录之后再点赞哦",
      icon: <Icon type="smile" style={{ color: "#108ee9" }} />
    });
  };

  changeTags(tags) {
    this.setState({
      tags
    });
  }

  render() {
    const { like, tags, comments, isLogin, total } = this.props;
    const likes = like.toJS();
    // 根据质量或时间进行排序
    if (comments && comments.length > 0) {
      let pai = null;
      if (this.state.sort === "limit") {
        pai = "commentTime";
      } else {
        pai = "readCnt";
      }
      for (let i = 0; i < comments.length - 1; i++) {
        for (let j = 0; j < comments.length - 1; j++) {
          if (comments[j + 1][pai] > comments[j][pai]) {
            let obj = comments[j];
            comments[j] = comments[j + 1];
            comments[j + 1] = obj;
          }
        }
      }
    }
    return (
      <Fragment>
        <div className="content">
          <Tail />
          <div className="btm-cont clear">
            <div className="btm-left">
              <div>
                <h3>商家团购及优惠</h3>
                {isLogin || (
                  <div className="deal-need-login">
                    <img
                      src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
                      alt="请登录"
                    />
                    <span>请登录后查看详细团购优惠</span>
                    <button className="btn btn-default btn-clr-g">
                      <Link to="/login" className="kongbai">立即登录</Link>
                    </button>
                  </div>
                )}
              </div>
              <div className="comment">
                <div className="total">
                  <div className="sort">
                    <span
                      onClick={() => this.clickDoubleSort("default")}
                      className={this.state.sort === "default" ? "on" : ""}
                    >
                      质量排序
                    </span>
                    <span
                      onClick={() => this.clickDoubleSort("limit")}
                      className={this.state.sort === "limit" ? "on" : ""}
                    >
                      时间排序
                    </span>
                  </div>
                  {total}条网友点评
                </div>
                <div className="com-cont">
                  {tags && tags.length > 0 && (
                    <ul className="tags clear">
                      {tags.map((v, i) => {
                        return (
                          <li
                            key={i}
                            onClick={() => {
                              this.changeTags(i);
                            }}
                            className={i === this.state.tags ? "onSel" : ""}
                          >{`${v.tag}(${v.count})`}</li>
                        );
                      })}
                    </ul>
                  )}
                  <div className="sea">
                    <span>
                      <b></b>
                      只看有图片的评论
                    </span>
                  </div>
                  <div>
                    {comments &&
                      comments.length > 0 &&
                      comments.map(v => {
                        return (
                          <div key={v.commentTime} className="list clear">
                            <div className="header">
                              <div className="imgbox">
                                {v.userUrl && (
                                  <img src={v.userUrl} alt={v.userName} />
                                )}
                              </div>
                            </div>
                            <div className="info">
                              <div className="name">{v.userName}</div>
                              <div className="date">
                                <span>{format(v.commentTime)}</span>
                              </div>
                              <div className="source">
                                <div className="star-cont">
                                  <ul className="stars-ul">
                                    <li>
                                      <i className="iconfont icon-star_full"></i>
                                    </li>
                                    <li>
                                      <i className="iconfont icon-star_full"></i>
                                    </li>
                                    <li>
                                      <i className="iconfont icon-star_full"></i>
                                    </li>
                                    <li>
                                      <i className="iconfont icon-star_full"></i>
                                    </li>
                                    <li>
                                      <i className="iconfont icon-star_full"></i>
                                    </li>
                                  </ul>
                                  <ul
                                    className="stars-ul stars-light"
                                    style={{ width: v.star * 2 + "%" }}
                                  >
                                    <li>
                                      <i className="iconfont icon-star_full"></i>
                                    </li>
                                    <li>
                                      <i className="iconfont icon-star_full"></i>
                                    </li>
                                    <li>
                                      <i className="iconfont icon-star_full"></i>
                                    </li>
                                    <li>
                                      <i className="iconfont icon-star_full"></i>
                                    </li>
                                    <li>
                                      <i className="iconfont icon-star_full"></i>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="desc">{v.comment}</div>
                              {v.merchantComment && (
                                <div className="reply">
                                  商家回复：
                                  {v.merchantComment}
                                </div>
                              )}
                              {v.picUrls.length > 0 && (
                                <div className="noShowBigImg">
                                  <div>
                                    <div className="imageViewer-content com-image-viewer iconfont">
                                      <div className="imgs-content">
                                        <div className="paginatedThumbnails">
                                          <div className="thumbnails">
                                            {v.picUrls.map(item => {
                                              return (
                                                <div
                                                  key={item.id}
                                                  className="thumbnail"
                                                >
                                                  <img
                                                    src={item.url}
                                                    alt={item.url}
                                                  />
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="like-cont">
                                <div className="like" onClick={this.addLike}>
                                  <b></b>
                                  <span>赞</span>
                                </div>
                              </div>
                              <div className="line"></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <Right likes={likes} getDoubleData={this.getDoubleData} />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    like: state.get("Home").get("reData"),
    tags: state.get("Detail").get("tags"),
    comments: state.get("Detail").get("comments"),
    isLogin: state.get("Header").get("isLogin"),
    total: state.get("Detail").get("total"),
    list: state.get("Home").get("reData")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDefaultData(data) {
      dispatch(getMeiShi(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
