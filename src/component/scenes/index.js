import React, { PureComponent } from "react";
import data from "../../config/scenes.json";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getHomeData } from "../store/createAction";
import "./index.less";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: 0,
      url: "all",
      fangwen: []
    };
  }

  componentDidMount = () => {
    this.props.getData("all");
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
          <div className="index-nav-container undefined">
            <ul className="clearfix ">
              <li className="title nav-item mf-shang-hei-regular">有格调</li>
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
          <div className="quality-area clearfix">
            {shuzu.map((item, index) => {
              return (
                <Link key={item.id} to="/loading" className="link quality-card">
                  <div className="quality-img">
                    <img src={item.imgUrl} alt={item.iUrl} />
                  </div>
                  <div className="poi-info">
                    <div className="title" title={item.title}>
                      {item.title}
                    </div>
                    <div className="sub-title" title={item.subTitle}>
                      {item.subTitle}
                    </div>
                    <div className="price-info">
                      <span className="current-price-wrapper">
                        <span className="price-symbol numfont">¥</span>
                        <span
                          className="current-price numfont"
                          title={item.currentPrice}
                        >
                          {item.currentPrice}
                        </span>
                      </span>
                      <span className="old-price" title={item.oldPrice}>
                        {item.oldPrice}
                      </span>
                      <span
                        className="sold bottom-right-info"
                        title={item.bottomInfo}
                      >
                        {item.bottomInfo}
                      </span>
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

const mapStateToProps = state => {
  return {
    list: state.get("Home").get("data"),
    have: state.get("Home").get("have")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData(data) {
      dispatch(getHomeData(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
