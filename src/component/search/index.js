import React, { PureComponent } from "react";
import "./index.less";

class Home extends PureComponent {
  render() {
    return (
      <div>
        搜索
        {this.props.match.params.content}
      </div>
    );
  }
}

export default Home;
