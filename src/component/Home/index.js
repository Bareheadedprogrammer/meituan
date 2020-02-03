import React, { PureComponent } from "react";
import Banner from "../left-banner";
import Scenes from '../scenes';
import Offer from '../offer';
import Recommend from '../recommend';
import "./index.less";

class Home extends PureComponent {
  render() {
    return (
      <div className="page index">
        <div className="index-container">
          <Banner />
          <Scenes />
          <Offer />
          <Recommend />
        </div>
      </div>
    );
  }
}

export default Home;
