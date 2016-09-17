import React, { Component } from 'react';

import CopyrightBar from '../../components/CopyrightBar';

import Sequencer from '../../components/Sequencer';

import Bumpkit from '../../components/Bumpkit';

import './index.css';

class Home extends Component {

  render() {

    let clips = [];

    const bumpkit = new Bumpkit({
      tempo: 96,
      loop: 64
    })

    for (let i = 0; i < 8; i++) {
      clips[i] = bumpkit.createClip();

      clips[i].pattern = [];
    }

    return (
      <div className="Home">
        <Sequencer {...this.props} {...this.state}/>
        <CopyrightBar />
      </div>
    );
  }
}

export default Home;
