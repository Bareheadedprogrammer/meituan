import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class index extends PureComponent {
  render() {
    const { likes } = this.props;
    return (
      <div className="btm-right">
        <div className="guess-you-like">
          <h4>猜你喜欢</h4>
          <ul>
            {likes &&
              likes[0] &&
              likes[0].data.map((v, i) => {
                return (
                  <li key={i}>
                    <Link
                      to={{ pathname: `${v.itemId}` }}
                      onClick={this.props.getDoubleData}
                    >
                      <div className="pic">
                        <div className="imgbox">
                          <img src={v.imgUrl} alt={v.title} />
                        </div>
                      </div>
                      <p className="name">{v.title}</p>
                      <p className="desc">{v.areaName}</p>
                      <p className="price">
                        <b>￥</b>
                        {v.lowPrice}
                      </p>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}
