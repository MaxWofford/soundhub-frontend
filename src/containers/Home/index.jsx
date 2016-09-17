import React, { Component } from 'react';

import CopyrightBar from '../../components/CopyrightBar';

import Sequencer from '../../components/Sequencer';

import './index.css';

class Home extends Component {

  render() {
    return (
      <div className="Home">
        <Sequencer />
        <CopyrightBar/>
      </div>
    );
  }
}

export default Home;
