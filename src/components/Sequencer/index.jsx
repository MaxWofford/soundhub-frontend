import React, { Component } from 'react';
import { stepFilter } from '../../util/Helper';
let TriggerRow = require('../TriggerRow');

class Sequencer extends Component {
  state = {
    isSelecting: false,
    isDeselecting: false
  }

  setMouseDown(mode) {
    if (mode == 'select') {
      this.setState({ isSelecting: true });
    } else if (mode == 'deselect') {
      this.setState({ isDeselecting: true });
    }
  }

  setMouseUp() {
    this.setState({
      isSelecting: false,
      isDeselecting: false
    });
  }

  renderRow = (clip, i) => {
    let self = this;
    let updateClip = function(clip) {
      let clips = self.props.clips;
      clips[i] = clip;
      self.props.updateClips(clips);
    };
    return (
      <TriggerRow
        {...this.state}
        clip={clip}
        setMouseDown={this.setMouseDown}
        setMouseUp={this.setMouseUp}
        currentStep={this.props.currentStep}
        updateClip={updateClip}
        track={i} />
    )
  }

  renderXAxis() {
    let currentStep = this.props.currentStep
    let renderSteps = function() {
      let steps = [];
      for (let i = 0; i < 16; i++) {
        let current = (i == currentStep);
        let stepClass = 'h5 bold flex-auto px1 py1 ';
        stepClass += current ? 'red ' : '';
        if (!current) {
          stepClass += i % 4 ? 'muted ' : '';
        }
        let axisStepKey = 'axis-step-' + i;
        steps.push(
          <div key={axisStepKey} className={stepClass}>
            {stepFilter(i)}
          </div>
        )
      }
      return steps;
    }
    return (
      <div className="flex flex-center mxn1">
        {renderSteps()}
      </div>
    )
  }

  render() {
    return (
      <div className="flex-auto px2 ">
        {this.renderXAxis()}
        {this.props.clips.map(this.renderRow)}
      </div>
    )
  }
}

export default Sequencer;
