/*
    Import depedencies
*/
let request = require('request')
let cheerio = require('cheerio')
let urlencode = require('urlencode')
const { RichEmbed } = require('discord.js');


async function stroke(message) {
    // Initialize embed
    let embed = new RichEmbed()
    // Initialize result
    let result

    // Get character from second array element of splitted string
    let character = message.content.split(' ')[1]

    // Return if character or argument is empty
    if (character === undefined) {
        result = 'Character must not be empty!'
        embed.setDescription(result)
        return message.channel.send(embed)
    }

    // Encode character to URL readable
    let encodedCharacter = urlencode(character)
    // Set URL
    let url = `http://www.strokeorder.info/mandarin.php?q=${encodedCharacter}`
    // Create request promise
    let requestPromise = new Promise((resolve, reject) => {
        // Options setup
        let options = {
            url: url,
            headers: {
                'User-Agent': 'request'
            }
        }
        // Callback setup
        let callback = (err, res, body) => {
            if (res.statusCode === 200) {
                // Load body to cheerio
                const $ = cheerio.load(body)
                // Get .gif URL
                let imageSource = $('h1').next().attr('src')
                resolve(imageSource)                
            } else {
                resolve('Character does not exist inside ``strokeorder.info`` database!')
            }

        }
        request(options, callback)
    })
    // Run request
    result = await requestPromise
    // Send does not exist message
    if (!result.endsWith('.gif')) {
        embed.setDescription(result)
        message.channel.send(embed)
    }
    // Send stroke order .gif
    embed.setImage(result)
    message.channel.send(embed)         
}

module.exports = stroke