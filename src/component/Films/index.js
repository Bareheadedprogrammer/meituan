import React, { PureComponent, Fragment } from "react";
import data from "../../config/film.json";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getFilmData } from "../store/createAction";
import "./index.less";

const mapStateToProps = state => {
  return {
    list: state.get("Home").get("filmData"),
    have: state.get("Home").get("filmHave")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData(data) {
      dispatch(getFilmData(data));
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: 0,
      url: "getHotFilms",
      fangwen: [],
      nextClick: false
    };
  }

  componentDidMount = () => {
    if (this.props.list.size === 0) {
      this.props.getData("getHotFilms");
    }
  };

  mouseEnterEvent(data, url, have) {
    this.setState(
      {
        item: data,
        url,
        fangwen: have.toJS()
      },
      () => {
        const jia = this.state.fangwen;
        let flag = 0;
        for (let i = 0; i < jia.length; i++) {
          jia[i] === url && flag++;
        }
        if (flag === 0) {
          this.props.getData(url, have);
        }
      }
    );
  }

  changeFilm() {
    var gai = null;
    // next代表点击下一次
    if (this.state.nextClick) {
      gai = false;
    } else {
      gai = true;
    }
    this.setState({
      nextClick: gai
    });
  }

  render() {
    const { list, have } = this.props;
    let defaultList = list.toJS();
    let shuzu = null;
    if (defaultList.length === 0) {
      shuzu = [];
    } else {
      shuzu = defaultList[0].data;
    }
    for (let i = 0; i < defaultList.length; i++) {
      if (defaultList[i].url === this.state.url) {
        shuzu = defaultList[i].data;
      }
    }
    return (
      <div className="scenes-container">
        <div className="quality-container">
          <div
            className="index-nav-container undefined"
            style={{
              background:
                "linear-gradient(to right, rgb(250, 60, 104) 2%, rgb(254, 70, 77) 97%) rgb(250, 60, 104)"
            }}
          >
            <ul className="clearfix ">
              <li className="title nav-item mf-shang-hei-regular">猫眼电影</li>
              {data.data.map((item, index) => {
                return (
                  <li
                    onMouseEnter={() =>
                      this.mouseEnterEvent(index, item.url, have)
                    }
                    className={[
                      "nav-item",
                      this.state.item === index && "active"
                    ].join(" ")}
                    key={index}
                  >
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="scenes-body">
            <div className="slider">
              <div
                style={{
                  left: this.state.nextClick ? "-1165px" : "0px"
                }}
                className="slider-content clearfix"
              >
                {shuzu.map(item => {
                  return (
                    <div className="slider-item-film" key={item.id}>
                      <Link to={{ pathname: `/films/${item.id}` }}>
                        <img
                          src={item.img}
                          alt={item.nm}
                          className="image film-img"
                        />
                        <img
                          style={{
                            display:
                              item.ver.indexOf("MAX") !== -1
                                ? "inline-block"
                                : "none"
                          }}
                          src="http://s0.meituan.net/bs/fe-web-meituan/25e6614/img/imax.png"
                          alt="max"
                          className="film-mark"
                        />
                        <div className="film-info">
                          <p className="film-score">
                            <b>
                              {item.mk === 0 ? (
                                <Fragment>
                                  <span>{item.wish}</span>
                                  人想看
                                </Fragment>
                              ) : (
                                <Fragment>
                                  观众评
                                  <span>{item.mk}</span>
                                </Fragment>
                              )}
                            </b>
                          </p>
                          <p className="film-name">{item.nm}</p>
                          {item.globalReleased && (
                            <span className="buy-ticket">购票</span>
                          )}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div
                className="btn btn-next"
                style={{ right: 0 }}
                onClick={() => this.changeFilm()}
              >
                <span className="iconfont icon-you"></span>
              </div>
              <div
                className="btn btn-pre"
                style={{ left: 0 }}
                onClick={() => this.changeFilm()}
              >
                <span className="iconfont icon-zuo"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
