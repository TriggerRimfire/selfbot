module.exports = {
  execute: (message, client, suffix) => {
    try {
          result = eval(suffix);
      } catch (error) {
          message.channel.createMessage(`\`\`\`diff\n- ${error}\`\`\``);
      }
      if (result !== '~eval failed~') {
          message.channel.createMessage(`${result}`);
      }

  }
}
