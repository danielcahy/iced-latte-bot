const request = require('request')
const htmlToText = require('html-to-text')
const urlencode = require('urlencode')
const readlineSync = require('readline-sync')
const { RichEmbed } = require('discord.js');



let dict = (message) => {
    // Initialize embed
    let embed = new RichEmbed()
    // Initialize result
    let result

    // Get character(s) from second array element of splitted string
    let query = message.content.split(' ')[1]    

    message.channel.send(query)













    // message.channel.send('Type something..') //Searching result..
    // .then(msg => {
    //     const filter = m => m.author === message.author
    //     const collector = msg.channel.createMessageCollector(filter, { time: 15000 });
        
    //     collector.on('collect', m => {
    //         //Stop collecting
    //         collector.stop()
    //     });
        
    //     collector.on('end', collected => {
    //         //Delete 'Searching result' message
    //         msg.delete()
    //     });         
    // })
    // .catch(err => console.err)
   
}

module.exports = dict