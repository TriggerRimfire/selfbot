const exec = require('child_process').exec
module.exports = {
  execute: (message, client) => {
    console.log(message.content)
    exec(message.content, (err, stdout, stderr) => {
      message.channel.createMessage("```js\n" + stdout +"\n"+ stderr + "\n```")
    })
  }
}
