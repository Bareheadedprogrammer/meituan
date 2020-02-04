import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { DatePicker, Button, Tooltip } from "antd";
import { getJiuCateData } from "../store/createAction";
import { imgReturnOne } from "../../../utils/imgReturn";
import "./index.less";

const mapStateToProps = state => {
  return {
    jiuList: state.get("Detail").get("jiuList")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListData(url) {
      dispatch(getJiuCateData(url));
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Jiudian extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      index: 0,
      shu: [
        {
          url: "#deal",
          title: "房型预订"
        },
        {
          url: "#map",
          title: "交通位置"
        },
        {
          url: "#info",
          title: "酒店信息"
        }
      ],
      lan: [
        {
          title: "上网",
          sub: "WiFi和宽带"
        },
        {
          title: "卫浴",
          sub: "独立"
        },
        {
          title: "窗户",
          sub: "有"
        },
        {
          title: "可住",
          sub: "2人"
        },
        {
          title: "面积",
          sub: "42㎡"
        }
      ]
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.props.getListData(this.props.match.params.id);
  }

  handleScroll() {}

  isShowToHide = () => {
    this.setState({
      show: false
    });
  };

  clickShowIndex(index) {
    this.setState({
      index
    });
  }

  render() {
    const { jiuList } = this.props;
    return (
      <div id="poiDetail">
        <div className="site-wrapper-wide">
          <div className="site-wrapper">
            <div className="breadcrumb-nav">
              酒店
              <span className="breadcrumb-divider">></span>
            </div>
            <div
              id="deal"
              className="deal-box bordered border-radius4 mt10 bgw"
            >
              <ul className="nav-tabs clearfix bgw">
                <div className="nav-tabs-content">
                  {this.state.shu.map((v, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => this.clickShowIndex(i)}
                        className={[
                          "li-fir",
                          i === this.state.index ? "current" : ""
                        ].join(" ")}
                      >
                        <a href={v.url}>{v.title}</a>
                      </li>
                    );
                  })}
                </div>
              </ul>
              <div className="deal-list-box">
                <div className="filter-box clearfix">
                  <DatePicker
                    className="kong"
                    placeholder="入住时间"
                    format={"YYYY-MM-DD"}
                  />
                  －
                  <DatePicker
                    className="kong"
                    placeholder="离开时间"
                    format={"YYYY-MM-DD"}
                  />
                  <Button type="primary">重新搜索</Button>
                </div>
                <div>
                  <div className="deal-section">
                    <ul className="deal-table">
                      {jiuList &&
                        jiuList.length > 0 &&
                        jiuList[1].imgs.map((v, index) => {
                          return (
                            <li
                              key={index}
                              className="deal-item clear bor-top is-extended"
                            >
                              <div className="deal-img pull-left relative has-img">
                                <span className="deal-img-icon-plus iconfont icon-fangda"></span>
                                <img
                                  src={imgReturnOne(v.urls[0], 1)}
                                  alt={v.urls[0]}
                                />
                                <div className="deal-img-number">{v.count}</div>
                              </div>
                              <div className="pull-right">
                                <div className="pull-right fs12 see-more-goods fw3">
                                  <div>
                                    共1个产品
                                    <span className="iconfont icon-shang"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="book-info">
                                <ul className="deal-margin-left hotel-service-info">
                                  <li className="fs18 fc3 mb15 deal-cellname">
                                    {v.imgDesc}
                                  </li>
                                  <div className="deal-cell-baseinfo">
                                    {this.state.lan.map((v, i) => {
                                      return (
                                        <li key={i}>
                                          <div className="fs12 pull-left mr20 deal-detail-spliter">
                                            <span className="fc9">
                                              {v.title}
                                            </span>
                                            &nbsp;
                                            <span className="fc15 fw3">
                                              {v.sub}
                                            </span>
                                          </div>
                                        </li>
                                      );
                                    })}
                                  </div>
                                  <div className="deal-cell-baseinfo">
                                    <li>
                                      <div className="fs12 pull-left mr20 deal-detail-spliter">
                                        <span className="fc9">床型</span>
                                        &nbsp;
                                        <span className="fc15 fw3">
                                          大床1.8×2.0米1张或大床1.5×2.0米2张
                                        </span>
                                      </div>
                                    </li>
                                  </div>
                                </ul>
                                <div>
                                  <div className="deal-margin-left">
                                    <table className="deal-table fs12 fc3 deal-table-show">
                                      <tbody>
                                        <tr className="goods block">
                                          <td width="265">
                                            <span className="deal-cellname">
                                              特惠价
                                            </span>
                                            <label className="deal-label">
                                              代理
                                            </label>
                                          </td>
                                          <td width="118">有窗户</td>
                                          <td width="118">无早餐</td>
                                          <td width="130">
                                            <Tooltip
                                              placement="bottom"
                                              title="订单确定后不可取消/变更,如未入住,酒店将扣除全额房费"
                                            >
                                              <span className="bor-bottom-dotted">
                                                不可取消
                                              </span>
                                            </Tooltip>
                                          </td>
                                          <td
                                            width="150"
                                            className="deal-table-useInfo"
                                          >
                                            使用规则
                                          </td>
                                          <td className="dl-redirect">
                                            <div className="show-detail">
                                              微信小程序预定
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table className="deal-table fs12 fc3 deal-table-show">
                                      <tbody>
                                        <tr className="goods block">
                                          <td width="265">
                                            <span className="deal-cellname">
                                              特惠价
                                            </span>
                                            <label className="deal-label">
                                              代理
                                            </label>
                                          </td>
                                          <td width="118">有窗户</td>
                                          <td width="118">无早餐</td>
                                          <td width="130">
                                            <Tooltip
                                              placement="bottom"
                                              title="订单确定后不可取消/变更,如未入住,酒店将扣除全额房费"
                                            >
                                              <span className="bor-bottom-dotted">
                                                不可取消
                                              </span>
                                            </Tooltip>
                                          </td>
                                          <td
                                            width="150"
                                            className="deal-table-useInfo"
                                          >
                                            使用规则
                                          </td>
                                          <td className="dl-redirect">
                                            <div className="show-detail">
                                              微信小程序预定
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
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
