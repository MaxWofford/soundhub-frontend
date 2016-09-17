import React, { Component } from 'react';
import Helper, { stepFilter } from '../../util/Helper';
import Icon from 'react-geomicons';

let KitSelect = require('../KitSelect');
let BankSelect = require('../BankSelect');

class Toolbar extends Component {
  render() {
    let tempo = this.props.tempo;
    let tempoInputStyle = { width: '5rem' }
    let playPauseIcon = this.props.isPlaying ? 'pause' : 'play';
    let currentStep = stepFilter(this.props.currentStep);
    let currentBank = this.props.banks[this.props.currentBank].name;
    let currentKit = this.props.kits[this.props.currentKit].name;
    return (
      <header className="xborder-bottom xborder-thick xborder-bright-blue px2">
        <div className="flex flex-center flex-wrap mxn1 py1">
          <div className="px1 py1">
            <button className="h3 button-outline blue border-thick"
              onClick={this.props.playPause}>
              <Icon name={playPauseIcon} />
            </button>
          </div>
          <div className="flex flex-center p1">
            <label className="h5 bold mr1 hide">Tempo</label>
            <input type="text"
              value={tempo}
              onChange={this.props.handleTempoChange}
              style={tempoInputStyle}
              className="m0 field-dark" />
          </div>
          <div className="h5 bold p1">
            {currentStep}
          </div>

          {/* <h1 className="h3 m0 px1">Stepkit</h1> */}
          {/* <div className="h5 bold p1">
              {currentKit}
            </div> */}

          <div className="flex-auto" />
          <div className="flex flex-center p1">
            <label className="h5 bold mr1">Pattern</label>
            <BankSelect {...this.props} />
          </div>
          <div className="flex flex-center p1">
            <label className="h5 bold mr1">Kit</label>
            <KitSelect {...this.props} />
          </div>

          {/* <div className="p1">
            <button className="button-small button-outline gray"
              onClick={this.props.randomize}>
              Randomize
            </button>
          </div>
          <div className="p1">
            <button className="button-small button-outline blue">Load</button>
          </div>
          <div className="p1">
            <button className="button-small button-outline blue">Save</button>
          </div> */}

        </div>
        <hr className="m0 border-thick border-bright-blue muted" />
      </header>
    )
  }
}

export default Toolbar;
