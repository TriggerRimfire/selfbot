const ee = require('eventemitter3')

global.Promise = require('bluebird');
const request = require('request-promise')

class Spotify extends ee {
  constructor(options = {}) {
    super();
    this.trackCount = options.trackCount;
    this.pollInterval = options.pollInterval;
    this.username = options.username;
    this.key = options.key;
  }
  requestHandler() {
    const options = {
      uri: `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
      &user=\`${this.username}\`
      &api_key=\`${this.key}\`
      &format=json`,
      method: 'GET'
    }
    return request(options).then( (body) => {
      let track = JSON.parse(body).recenttracks.track,
        parseTrack = []
      for(let i = 0; i < this.trackCount; i++) {
        parseTrack.push({
          name: track[i].name,
          artist: track[i].artist["#text"]
        })
      }
      return Promise.resolve(parseTrack);
    });
  }
  listen(){
    this.song();
    setInterval(() => {
      this.song();
    }, this.pollInterval);
  }
  song() {
    this.requestHandler().then(o => this.emit('trackChange', o), console.error);
  }
}
module.exports = Spotify;
