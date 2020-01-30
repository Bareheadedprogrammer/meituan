import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.less"

class Header extends Component {
  render() {
    const { name } = this.props;
    return <div>我是头部组件{name}</div>;
  }
}

// const mapDispatchToProps = dispatch => {};

const mapStateToProps = state => {
  return {
    name: state.get('Header').get('name')
  };
};

export default connect(mapStateToProps, null)(Header);
