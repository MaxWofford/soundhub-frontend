import axios from 'axios'

class Buffer {
  constructor (context) {
    this.context = context
    this.audio = null
    this.decode = this.decode.bind(this)
    this.load = this.load.bind(this)
  }

  decode (data) {
    try {
      return this.context.decodeAudioData(data)
        .then((buffer) => {
          this.audio = buffer
          return buffer
        })
        .catch((err) => {
          console.error('Buffer decodeAudioData error', err)
        })
    } catch (e) {
      // Handle Safari non-promise based
      console.warn('Buffer decodeAudioData - non-Promise syntax for Safari', e)
      if (e instanceof TypeError) {
        return new Promise((resolve, reject) => {
          this.context.decodeAudioData(data, (buffer) => {
            this.audio = buffer
            resolve(buffer)
          }, (err) => {
            console.error('Buffer decodeAudioData error', err)
            reject(err)
          })
        })
      } else {
        console.error('Buffer.decode() error', e)
      }
    }
  }

  load (url) {
    this.url = url
    const { decode } = this
    return axios.get(url, {
        responseType: 'arraybuffer'
      })
      .then((response) => {
        return decode(response.data)
      })
      .catch((err) => {
        console.error('Buffer.load() error', err)
      })
  }
}

export default Buffer

