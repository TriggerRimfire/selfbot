const { loadFolder } = require('../lib/utils')
const Eris = require('eris')
  class Client {
    constructor() {
      this.config = require('../config.json')
      this.bot = new Eris(this.config.token)
      this.commands = []
      loadFolder(require("path").resolve("../src/commands"), this)
      require('./events')(this)
      this.bot.connect()
    }
  }
module.exports = Client
