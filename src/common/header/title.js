import React, { PureComponent, Fragment } from "react";
import { Link } from "react-router-dom";
import data from "../../config/header-title.json";
import "./index.less";

class Title extends PureComponent {
  render() {
    return (
      <Fragment>
        {data.title.map((item, index) => {
          return (
            <dl
              key={index}
              className={["header-nav-third", item.class].join(" ")}
            >
              <dt>{item.title}</dt>
              {item.children.map((v, i) => {
                return (
                  <dd key={i}>
                    <Link to={v.url}>
                      {v.title}
                      {v.img && <img alt={i} src={v.img} />}
                    </Link>
                  </dd>
                );
              })}
            </dl>
          );
        })}
      </Fragment>
    );
  }
}

export default Title;
