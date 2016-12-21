const { readdirSync } = require("fs")
const path = require("path")

exports.loadFolder = function loadFolder(absolute, client) {
  const commands = readdirSync(absolute);
  for(let commandFile of commands) {
    if(commandFile.endsWith('.js')) {
      const command = client.commands[commandFile.slice(0, -3)] = require(__dirname+'/commands/'+commandFile)
      command.name = commandFile.slice(0, -3)
    }
  }
}
