const { loadFolder } = require('../lib/utils')
const Spotify = require('../lib/spotify')
const Eris = require('eris')
  class Client {
    constructor() {
      this.config = require('../config.json')
      this.bot = new Eris(this.config.token)
      this.commands = []
      console.log(Spotify)
      this.spotify = new Spotify({
        username: this.config.lastfm.username,
        key: this.config.lastfm.key,
        pollInterval: 15000,
        trackCount: 1
      })
      loadFolder(require("path").resolve("../src/lib/commands"), this)
      console.log(this.commands)
      require('./events')(this)
      this.spotify.listen()
      this.bot.connect()
    }
  }
module.exports = Client
