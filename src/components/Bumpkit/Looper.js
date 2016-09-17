
import Sampler from './Sampler'
import Envelope from './Envelope'

class Looper extends Sampler {
  constructor ({
    subscribe,
    context,
    sync,
    getState
  }, {
    bpm = 120,
    start = 0,
    loop = 16,
    active,
    url
  } = {}) {
    super(context, { url })
    // To do: support for start/end offsets

    this.getState = getState
    this.active = typeof active !== 'undefined' ? active : true
    this._previousTempo = getState().tempo

    // Sample properties
    this.bpm = bpm
    this.start = start
    this.loop = loop

    sync(this.shouldPlay.bind(this))
    subscribe(this.handleTempoChange.bind(this))

    // Bind methods
    this.play = this.play.bind(this)
  }

  handleTempoChange ({ tempo, playing }) {
    if (this.playing && this._previousTempo !== tempo) {
      this.playing.playbackRate.value = this.pitch
      this._previousTempo = tempo
    }

    if (!playing && this.playing) {
      this.playing.stop && this.playing.stop()
      this.playing = false
    }
  }

  get tempo () {
    const { tempo } = this.getState()
    return tempo
  }

  get pitch () {
    const { bpm, tempo } = this
    return tempo / bpm
  }

  set pitch (val) {
    this._pitch = val
  }

  get willStart () {
    return this.active && !this.playing
  }

  get willStop () {
    return !this.active && this.playing
  }

  shouldPlay ({ when, step }) {
    const quantize = this.getState().quantize


    const { active, loop, duration } = this
      // To do: adjust usage of start prop
      // const should = start === step % loop
    const should = 0 === step % loop

    if (quantize && step % quantize === 0) {
      if (this.willStop) {
        this.playing.stop && this.playing.stop(when)
        this.playing = false
      } else if (this.willStart) {
        const start = step / loop * duration
        this.play({ when, start })
      }
    } else if (active && should) {
      this.play({ when })
    } else if (!active && should && this.playing) {
      this.playing.stop && this.playing.stop(when)
      this.playing = false
    }
  }
}

export default Looper

