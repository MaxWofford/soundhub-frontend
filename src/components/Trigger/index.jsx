import React, { Component } from 'react';

class Trigger extends Component {
  handleMouseDown(e) {
    let mode = this.props.active ? 'deselect' : 'select';
    this.props.setMouseDown(mode);
    this.props.updateClip(!this.props.active ? 1 : 0);
  }

  handleMouseUp(e) {
    this.props.setMouseUp();
  }

  handleMouseEnter(e) {
    if (this.props.isSelecting) {
      this.props.updateClip(1);
    } else if (this.props.isDeselecting) {
      this.props.updateClip(0);
    }
  }

  render() {
    let self = this;
    let buttonClass = 'flex-auto button-outline border-thick ';
    if (this.props.current) {
      buttonClass += (this.props.active) ? 'red bg-red ' : 'red bg-red muted ';
    } else {
      buttonClass += (this.props.active) ? 'bg-blue ' : '';
    }
    let buttonStyle = {
      height: '3rem'
    };
    return (
      <button className={buttonClass}
        key={this.props.step}
        title="Toggle step"
        style={buttonStyle}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseEnter={this.handleMouseEnter}
        />
    )
  }
}

export default Trigger;
