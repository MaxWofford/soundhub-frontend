import React, { Component } from 'react';

import './index.css';

import qs from 'query-string';

import Q from 'q';

import Bumpkit from '../../components/Bumpkit';

import Toolbar from '../../components/Toolbar';

import Sequencer from '../../components/Sequencer';

import Footer from '../../components/Footer';

class Editor extends Component {

  state = {
    isPlaying: false,
    loopLength: 16,
    tempo: 96,
    currentStep: 0,
    volume: 1,
    buffers: [],
    mixer: null,
    clips: [],
    samplers: [],
    currentKit: 1,
    currentBank: 2,
  }

  initMixer() {
    let mixer = Bumpkit.createMixer();
    for (let i = 0; i < 8; i++) {
      mixer.addTrack();
    }
    return mixer;
  }

  initClips() {
    let clips = [];
    for (let i = 0; i < 8; i++) {
      clips[i] = Bumpkit.createClip();
      clips[i].pattern = [];
    }
    return clips;
  }

  randomizePatterns =()=> {
    let clips = this.state.clips;
    for (let i = 0; i < 8; i++) {
      clips[i].pattern = [];
      for (let j = 0; j < 16; j++) {
        clips[i].pattern.push( Math.round(Math.random() * .625) );
      }
    }
    this.updateClips(clips);
  }

  loadBank =(i)=> {
    let bank = this.props.banks[i];
    let clips = this.state.clips;
    bank.tracks.forEach(function(track, j) {
      clips[j].pattern = track.pattern;
    });
    this.updateClips(clips);
    let tempo = bank.tempo || false;
    if (tempo) {
      this.setTempo(tempo);
    }
    this.setState({ currentBank: i }, function() {
      this.updateUrlParams();
    });
  }

  initSamplers () {
    var samplers = [];
    for (var i = 0; i < 8; i++) {
      //var freq = Math.pow(2, i + 3) / 3;
      //var beep = Bumpkit.createBeep({
      //  duration: .25,
      //  frequency: freq,
      //});
      var sampler = Bumpkit.createSampler();
      samplers[i] = sampler;
    }
    return samplers;
  }

  initConnections =()=> {
    var self = this;
    for (var i = 0; i < 8; i++) {
      var clip = this.state.clips[i];
      var sampler = this.state.samplers[i];
      var track = this.state.mixer.tracks[i];
      clip.connect(sampler);
      sampler.connect(track);
    }
  }

  loadBuffers =()=> {
    var self = this;
    var deferred = Q.defer();
    var kit = this.props.kits[this.state.currentKit];
    var samples = kit.samples;
    var buffers = this.state.buffers;
    Bumpkit.buffers = {};
    samples.forEach(function(sample, i) {
      (function(index) {
        var url = self.props.audio_path + kit.path + '/' + sample;
        Bumpkit.loadBuffer(url, function(buffer) {
          buffers[index] = buffer;
          buffers[index].url = url;
          if ( samples.length <= Object.keys(Bumpkit.buffers).length ) {
            self.setState({ buffers: buffers }, function() {
              deferred.resolve();
            });
          }
        });
      })(i);
    })
    return deferred.promise;
  }

  loadSamplers =()=> {
    var self = this;
    var samplers = this.state.samplers;
    var bufferKeys = Object.keys(this.state.buffers);
    bufferKeys.forEach(function(key, i) {
      samplers[i].buffer(self.state.buffers[key]);
    });
    this.setState({ samplers: samplers }, function() {
      console.log('samplers loaded');
    });
  }

  addStepListener = ()=> {
    if (!window) return false;
    var self = this;
    window.addEventListener('step', function(e) {
      var step = e.detail.step
      self.setState({ currentStep: step });
    });
  }

  playPause =()=> {
    if (!Bumpkit) return false;
    Bumpkit.playPause();
    this.setState({
      isPlaying: Bumpkit.isPlaying
    });
  }

  loadKit =(i)=> {
    var self = this;
    this.setState({ currentKit: i }, function() {
      self.loadBuffers().then(function() {
        self.loadSamplers();
      });
      self.updateUrlParams();
    });
  }

  handleTempoChange =(e)=> {
    var self = this;
    var tempo = e.target.value;
    this.setTempo(tempo);
  }

  setTempo =(n)=> {
    var self = this;
    Bumpkit.tempo = n
    this.setState({ tempo: Bumpkit.tempo }, function() {
      // Fix this in Bumpkit
      if (self.state.isPlaying) {
        self.state.mixer.master.mute.gain.value = 0;
        self.playPause();
        self.playPause();
        self.state.mixer.master.mute.gain.value = 1;
      }
      self.updateUrlParams();
    });
  }

  updateClips=(clips)=> {
    this.setState({ clips: clips });
  }

  initBumpkit =()=> {
    var self = this;
    if (!Bumpkit) { return false; }
    this.setTempo(this.state.tempo);
    Bumpkit.loopLength = this.state.loopLength;
    var mixer = this.initMixer();
    var clips = this.initClips();
    var samplers = this.initSamplers();
    this.setState({
      mixer: mixer,
      clips: clips,
      samplers: samplers,
      isPlaying: Bumpkit.isPlaying,
    }, function() {
      self.initConnections();
      self.loadBank(self.state.currentBank);
      self.loadBuffers().then(function() {
        self.loadSamplers();
      });
    });
    this.state.mixer.master.volume.gain.value = this.state.volume;
    this.addStepListener();
  }

  updateUrlParams =()=> {
    if (!window) { return false }
    var params = {
      tempo: this.state.tempo,
      currentKit: this.state.currentKit,
      currentBank: this.state.currentBank,
    };
    var query = '?' + qs.stringify(params);
    window.history.pushState(params, 'Stepkit', query);
  }

  componentDidMount =()=> {
    var self = this;
    if (window) {
      var params = qs.parse(window.location.search);
      this.setState(params);
    }
    this.initBumpkit();
    if (document) {
      document.onkeydown = function(e) {
        //console.log(e.which);
        switch (e.which) {
          case 32:
            e.preventDefault();
            self.playPause();
            break;
          default:
            break;
        }
      };
    }
  }



  render() {
    let containerStyle = {
      minHeight: '90vh'
    };

    return (
      <div className="Editor">
        <div className="flex flex-column"
          style={containerStyle}>
          <Toolbar {...this.props} {...this.state}
            playPause={this.playPause}
            handleTempoChange={this.handleTempoChange}
            loadBank={this.loadBank}
            loadKit={this.loadKit}
            randomize={this.randomizePatterns}
            />
          <Sequencer {...this.props} {...this.state}
            updateClips={this.updateClips}
            />
          <Footer {...this.props} />
        </div>
      </div>
    );
  }
}

export default Editor;
