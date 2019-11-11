/*
    Import depedencies
*/
const { RichEmbed } = require('discord.js');

async function helpMessage(message) {
    // Rich embed
    const embed = new RichEmbed()
        .addField('.help', 'Show help messages', false)
        .addField('.so', 'Stroke order commands | Ex: ``.so 你``', false)
        .addField('.dict', 'Dictionary commands | Ex: ``.dict 你`` or ``.dict ni3``', false)

   // Send message
    message.channel.send(embed)
}

module.exports = helpMessage

//.