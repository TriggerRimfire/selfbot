const ee = require('eventemitter3')
const request = require('request-promise')
class Spotify extends ee {
  constructor() {
    this.client.trackCount = this.trackCount;
    this.client.pollInterval = this.pollInterval;
    this.client.username = this.username;
    this.client.key = this.key;
  }
  requestHandler() {
    let options = {
      uri: `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
      &user=\`${this.username}\`
      &api_key=\`${this.key}\`
      &format=json`,
      method: 'GET'
    }
    request(options).then( (body) => {
      let track = JSON.parse(body).recenttracks.track,
        parseTrack = []
      for(let i = 0; i < this.trackCount; i++) {
        parseTrack.push({
          name: track[i].name,
          artist: track[i].artist["#text"]
        })
        this.song(parseTrack)
      }
    }).catch(reason) {
      done(reason)
    }
  }
  listen(){
    this.requestHandler()
    setInterval(() => {
      this.emit('trackChange', this.requestHandler())
    }, this.pollInterval)
  }
}
module.exports = Spotify;
