import React, { PureComponent } from "react";
import Banner from "../left-banner";
import Scenes from '../scenes';
import "./index.less";

class Home extends PureComponent {
  render() {
    return (
      <div className="page index">
        <div className="index-container">
          <Banner />
          <Scenes />
        </div>
      </div>
    );
  }
}

export default Home;
