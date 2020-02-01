import React, { PureComponent } from "react";
import axios from 'axios';
import "./index.less";

class Home extends PureComponent {

  constructor(props){
    super(props);
    this.searchEveryThing = this.searchEveryThing.bind();
  }

  async searchEveryThing(e){
    const data = await axios({
      method: "get",
      url: `/reptile/home?keyword=${e}`
    });
  }

  render() {
    this.searchEveryThing(this.props.match.params.content)
    return <div>搜索</div>;
  }
}

export default Home;
