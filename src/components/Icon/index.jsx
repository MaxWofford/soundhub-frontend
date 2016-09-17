import React, { Component } from 'react';
import IconPaths from 'react-geomicons';

class Icon extends Component {
  getDefaultProps() {
    return {
      icon: 'warning',
      path: ''
    }
  }

  render() {
    let path = IconPaths[this.props.icon];
    let style = {
      fill: 'currentColor'
    };
    return (
      <Icon name
        <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="icon"
      style={style}>
        <path d={path} />
        </svg>
    )
  }
}

export default Icon;
