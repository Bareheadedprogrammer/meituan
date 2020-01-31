import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import data from "../../config/header-right.json";
import Title from "./more";
import "./index.less";

class Right extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: null
    };
  }

  handlerMouse = (children, index) => {
    if (!children) {
      return false;
    }
    this.setState({
      show: index
    });
  };
  removeHandlerMouse = () => {
    this.setState({
      show: null
    });
  };

  render() {
    return (
      <ul>
        {data.rightList.map((item, index) => {
          return (
            <li
              onMouseEnter={() => this.handlerMouse(item.children, index)}
              onMouseLeave={this.removeHandlerMouse}
              className={item.children ? "has-child" : ""}
              key={index}
            >
              {item.url === "none" ? (
                item.name
              ) : (
                <Link to={item.url}>{item.name}</Link>
              )}
              {item.children ? (
                <ul
                  className={[
                    item.width,
                    index === this.state.show ? "show" : ""
                  ].join(" ")}
                >
                  {!item.children.more === true ? (
                    item.children.map((v, i) => {
                      return (
                        <li key={i}>
                          {v.url === "none" ? (
                            v.name
                          ) : (
                            <Link to={v.url}>{v.name}</Link>
                          )}
                        </li>
                      );
                    })
                  ) : (
                    <Title />
                  )}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Right;
