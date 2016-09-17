import React, { Component } from 'react';

import CopyrightBar from '../../components/CopyrightBar';

import './index.css';

import Bumpkit from '../../components/Bumpkit';

class Home extends Component {

  render() {
    return (
      <div className="Home">

        <CopyrightBar/>
      </div>
    );
  }
}

export default Home;
