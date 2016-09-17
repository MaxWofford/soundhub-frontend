import React, { Component } from 'react';

class BankSelect extends Component {
  handleChange(e) {
    this.props.loadBank(e.target.value);
  }

  render() {
    let banks = this.props.banks;
    let options = function() {
      let options = [];
      banks.forEach((bank, i) => {
        let optionKey = 'bank-option-' + i;
        options.push(
            <option key={optionKey} value={i}>{bank.name}</option>
        )
      });
      return options;
    };
    return (
        <select className="m0 field-dark"
      value={this.props.currentBank}
      onChange={this.handleChange}>
        {options()}
      </select>
    )
  }
}

export default BankSelect;
