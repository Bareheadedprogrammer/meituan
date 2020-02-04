import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getMeiShi } from "../store/createAction";
import { Link } from "react-router-dom";
import "./index.less";
import format from "../../../utils/dateChuli";

class index extends Component {
  componentDidMount() {
    this.props.getDefaultData(this.props.match.params.id);
  }

  getDoubleData = () => {
    this.props.getDefaultData(this.props.match.params.id);
  }

  render() {
    const { like, tags, comments, isLogin, total } = this.props;
    const likes = like.toJS();
    return (
      <Fragment>
        <div className="content">
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
                      立即登录
                    </button>
                  </div>
                )}
              </div>
              <div className="comment">
                <div className="total">
                  <div className="sort">
                    <span className="on">质量排序</span>
                    <span>时间排序</span>
                  </div>
                  {total}条网友点评
                </div>
                <div className="com-cont">
                  {tags && tags.length > 0 && (
                    <ul className="tags clear">
                      {tags.map((v, i) => {
                        return <li key={i}>{`${v.tag}(${v.count})`}</li>;
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
                                  <ul className="stars-ul stars-light" style={{width: v.star*2+"%"}}>
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
                                <div className="like">
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
            <div className="btm-right">
              <div className="guess-you-like">
                <h4>猜你喜欢</h4>
                <ul>
                  {likes[0].data.map((v, i) => {
                    return (
                      <li key={i}>
                        <Link to={{ pathname: `${v.itemId}` }}
                            onClick={ this.getDoubleData }
                        >
                          <div className="pic">
                            <div className="imgbox">
                              <img src={v.imgUrl} alt={v.title} />
                            </div>
                          </div>
                          <p className="name">{v.title}</p>
                          <p className="desc">{v.areaName}</p>
                          <p className="price">
                            <b>￥</b>
                            {v.lowPrice}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
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
    total: state.get("Detail").get("total")
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
