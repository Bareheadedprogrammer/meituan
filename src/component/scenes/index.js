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
      url: "all"
    };
  }

  mouseEnterEvent(data, url, have) {
    this.setState({
      item: data,
      url
    });
    let flag = false;
    have.map(i => {
      flag = i === this.state.url;
      console.log(i, this.state.url);
    });
    console.log(!flag);
    !flag || this.props.getData(url, have);
  }

  render() {
    const { list, have } = this.props;
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
            {list
              .get(0)
              .get("data")
              .map(item => {
                return (
                  <Link
                    key={item.get("id")}
                    to="/loading"
                    className="link quality-card"
                  >
                    <div className="quality-img">
                      <img src={item.get("imgUrl")} alt={item.get("iUrl")} />
                    </div>
                    <div className="poi-info">
                      <div className="title" title={item.get("title")}>
                        {item.get("title")}
                      </div>
                      <div className="sub-title" title={item.get("subTitle")}>
                        {item.get("subTitle")}
                      </div>
                      <div className="price-info">
                        <span className="current-price-wrapper">
                          <span className="price-symbol numfont">¥</span>
                          <span
                            className="current-price numfont"
                            title={item.get("currentPrice")}
                          >
                            {item.get("currentPrice")}
                          </span>
                        </span>
                        <span
                          className="old-price"
                          title={item.get("oldPrice")}
                        >
                          {item.get("oldPrice")}
                        </span>
                        <span
                          className="sold bottom-right-info"
                          title={item.get("bottomInfo")}
                        >
                          {item.get("bottomInfo")}
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
