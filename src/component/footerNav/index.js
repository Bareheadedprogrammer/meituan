import React, { PureComponent } from "react";
import data from "../../config/footer-nav.json";
import { Link } from "react-router-dom";
import "./index.less";

class FooterNav extends PureComponent {
  render() {
    return (
      <nav className="footer-nav">
        <div className="footer-nav-title">美团导航</div>
        <dl className="b-n-content">
          {data.data.map((item, index) => {
            return (
              <div key={index} className="b-n-classification">
                <dt className="b-n-subtitle">{item.title}</dt>
                <div className="b-n-sublist">
                  {item.children.map((v, i) => {
                    return (
                      <dd key={i} className="b-n-list-item">
                        <Link to={v.url}>
                          {v.title}
                          {v.hot && <span className="nav-promotion">HOT</span>}
                        </Link>
                      </dd>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </dl>
      </nav>
    );
  }
}

export default FooterNav;
