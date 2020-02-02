import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
import "./index.less";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        {
          url: "/loading",
          src:
            "http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg"
        },
        {
          url: "/loading",
          src:
            "http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg"
        },
        {
          url: "/loading",
          src:
            "http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg"
        },
        {
          url: "/loading",
          src:
            "http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg"
        },
        {
          url: "/loading",
          src:
            "https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png"
        }
      ],
      showItem: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        showItem: this.state.showItem >= 5 ? 0 : this.state.showItem + 1
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handlerPreCode(data) {
    let item = this.state.showItem + data;
    if (item >= 5) {
      item = 0;
    }
    if (item < 0) {
      item = 4;
    }
    this.setState({
      showItem: item
    });
  }

  render() {
    return (
      <Fragment>
        <div className="slider-content clearfix">
          {this.state.arr.map((item, index) => {
            return (
              <div
                className={[
                  "slider-item",
                  this.state.showItem === index && "show"
                ].join(" ")}
                key={index}
                style={{ left: -index * 550 }}
              >
                <Link to={item.url}>
                  <div
                    className="slider-img-div"
                    style={{ backgroundImage: `url(${item.src})` }}
                  ></div>
                </Link>
              </div>
            );
          })}
        </div>
        <div id="banner-sliderpage" className="slider-pagination">
          {this.state.arr.map((item, index) => {
            return (
              <div
                className={[
                  "pagination",
                  this.state.showItem === index && "show"
                ].join(" ")}
                key={index}
              ></div>
            );
          })}
        </div>
        <div className="btn btn-pre" onClick={() => this.handlerPreCode(-1)}>
          <span className="icon-zuo iconfont"></span>
        </div>
        <div className="btn btn-next" onClick={() => this.handlerPreCode(1)}>
          <span className="icon-you iconfont"></span>
        </div>
      </Fragment>
    );
  }
}

export default Home;
