import React, { Component } from 'react';

class KitSelect extends Component {
  handleChange(e) {
    this.props.loadKit(e.target.value);
  }

  render() {
    let kits = this.props.kits;
    let options = function() {
      let options = [];
      kits.forEach(function(kit, i) {
        let optionKey = 'kit-option-' + i
        options.push(
            <option key={optionKey} value={i}>{kit.name}</option>
        )
      });
      return options;
    };
    return (
        <select className="m0 field-dark"
      value={this.props.currentKit}
      onChange={this.handleChange}>
        {options()}
      </select>
    )
  }
}

export default KitSelect
