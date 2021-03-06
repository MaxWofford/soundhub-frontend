class Clip {
  constructor (instrument, pattern = []) {
    this.instrument = instrument
    this.pattern = pattern

    this.active = true

    this.play = this.play.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  play ({ step, when }) {
    const { instrument, active, pattern } = this

    if (instrument && active && pattern[step - 1]) {
      instrument.play({ when })
    }
  }

  toggle () {
    this.active = !this.active
  }
}

export default Clip
