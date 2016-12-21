module.exports = {
  execute: (message, client) => {
    let hr = process.hrtime()
    message.channel.createMessage('pong').then(msg => {
    let exec = Math.round(process.hrtime(hr)[1] / 1000000)
    msg.edit('Pong! Latency:`' + exec + 'ms`')
    })


  }
}
