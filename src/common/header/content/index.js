import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.less";

class Content extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      isShow: false,
      dataArr: []
    };
  }

  searchEverything = () => {
    this.refs.search.style.display = "block";
    this.getData();
  };

  searchNoEverything = () => {
    if (!this.state.isShow) {
      this.refs.search.style.display = "none";
    }
  };

  async getData() {
    if (!this.state.key) {
      return false;
    }
    const data = await axios({
      method: "get",
      url: `/ptapi/suggest?keyword=${this.state.key}`
    });
    if (data.data.data) {
      this.setState({
        dataArr: data.data.data.suggestItems
      });
    }
  }

  mouseEnterEvent = () => {
    this.setState({
      isShow: true
    });
  };

  mouseLeaveEvent = () => {
    this.setState({
      isShow: false
    });
  };

  onChangeSearch = event => {
    this.setState({
      key: event.target.value
    });
    this.getData();
  };

  toSearchTip = (data)=>{
    this.setState({
      key: data
    })
    this.refs.search.style.display = "none";
  }

  render() {
    const url = this.props.match.url;
    return (
      <div
        className={["header-content", url === "/" ? "bottom-30" : null].join(
          " "
        )}
      >
        <div className="header-title-module">
          <Link to="/">
            <img alt="美团首页" src={require("../../../static/logo.png")}></img>
          </Link>
        </div>
        <div className="header-search-module">
          <div className="header-search-block">
            <input
              type="text"
              className="header-search-input"
              placeholder="搜索商家或地点"
              onFocus={this.searchEverything}
              onBlur={this.searchNoEverything}
              onChange={this.onChangeSearch}
              value={this.state.key}
            />
            <button className="header-search-btn">
              <span className="icon-sousuo iconfont"></span>
            </button>
          </div>
          <div
            className={
              this.state.key.length > 0
                ? "header-search-suggest hasinput"
                : "header-search-suggest"
            }
            ref="search"
          >
            <div className="header-search-noinput">
              <h6>热门搜索</h6>
              <div className="header-search-hotword"></div>
            </div>
            <div
              className="header-search-hasinput"
              onMouseEnter={this.mouseEnterEvent}
              onMouseLeave={this.mouseLeaveEvent}
            >
              <ul>
                {this.state.dataArr.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link onClick={()=>{this.toSearchTip(item.query)}} to = {{pathname:`/s/${item.query}`}} >{item.query}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Content);
