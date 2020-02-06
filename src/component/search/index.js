import React, { PureComponent } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./index.less";

class Home extends PureComponent {

  constructor(props){
    super(props);
    this.state={
      msg: ""
    }
  }

  async searchEveryThing(e){
    const data = await axios({
      method: "get",
      url: `/reptile/reptile/home?keyword=${e}`
    });
    this.setState({
      msg: data.data
    })
  }

  render() {
    this.searchEveryThing(this.props.match.params.content)
    return(
      <div id="react">
        <div className="list-container">
          <div className="crumb">
            <Link to="/" className="crumb-item">美团首页</Link>
            <h1 className="crumb-item">
              {
                this.props.match.params.content
              }
            </h1>
          </div>
            <h1>{this.state.msg}</h1>
        </div>
      </div>
    )
  }
}

export default Home;
