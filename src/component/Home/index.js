import React, { PureComponent } from "react";
import Banner from "../banner";
import "./index.less";

class Home extends PureComponent {
  render() {
    return (
      <div className="page index">
        <div className="index-container">
          <Banner />
        </div>
      </div>
    );
  }
}

export default Home;
