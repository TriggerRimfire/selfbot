module.exports = client => {
  client.bot.on('ready', () => {
    console.log('ready')
  })
  client.bot.on('messageCreate', (message) => {
    if(!message.guild || message.channel.type === 'dm') return
    if(message.author.id !== client.config.owner) return
    const identifiers = client.config.identifiers
    if(identifiers.indexOf(message.content[0]) != -1){
    const msg = message.content.trim();
    const sep = msg.indexOf(' ')
    const cmd = ( sep != -1 ? msg.substring(1, sep) : msg.substring(1) )
    let commands = client.commands
    if(cmd in commands) {
      message.content = (sep != -1 ? msg.substring(sep).trim() : '')
      client.commands[cmd].execute(message, client)
    }
    }

  })
  client.spotify.on('trackChange', (song) => {
    console.log(song);
    let curr = '🎵 '+song[0].artist+' - '+song[0].name
    console.log(curr)
    client.bot.editStatus('dnd', {'name': curr})
  //  client.bot.shards.forEach(shard => {
  //    shard.editStatus('dnd', {'name': curr})
  //  })
  })

}
