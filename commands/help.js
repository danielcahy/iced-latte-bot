/*
    Import depedencies
*/
const { RichEmbed } = require('discord.js');


async function helpMessage(message) {
   const embed = new RichEmbed()
    .setTitle('Available commands')
    .setDescription('.help \n>help message \n.so \n>stroke order')
    message.channel.send(embed)
}

module.exports = helpMessage