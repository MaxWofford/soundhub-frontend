import React, { Component } from 'react';
import Helper, { stepFilter } from '../../util/Helper';

let Trigger = require('../Trigger');

class TriggerRow extends Component {
  renderTrigger(step, i) {
    let self = this;
    let active = (step > 0);
    let clip = this.props.clip;
    let updateClip = function(value) {
      clip.pattern[i] = value;
      self.props.updateClip(clip);
    };
    let beat = stepFilter(i + 1);
    let current = (this.props.currentStep == i);
    let cellClass = 'flex-auto flex px1 py1 ';
    //cellClass += i%4 ? '' : 'bg-darken-2';
    cellClass += (!active && i%4) ? 'muted' : '';
    let triggerKey = 'trigger-' + i;
    return (
        <div key={triggerKey} className={cellClass}>
        <Trigger
      {...this.props}
      active={active}
      current={current}
      step={i}
      updateClip={updateClip} />
        </div>
    )
  }

  render() {
    let clip = this.props.clip;
    let key = 'row-' + this.props.track;
    return (
        <div key={key} className="flex flex-center mxn1 ">
        {clip.pattern.map(this.renderTrigger)}
      </div>
    )
  }
}

