/*
    Import depedencies
*/
const { RichEmbed } = require('discord.js');


async function helpMessage(message) {
    // Rich embed
    const embed = new RichEmbed()
        .addField('.help', 'Show help messages', false)
        .addField('.so', 'Stroke order commands /n Ex: ``.so 你``', false)

   // Send message
    message.channel.send(embed)
}

module.exports = helpMessage