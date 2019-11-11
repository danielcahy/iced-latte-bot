const request = require('request')
const urlencode = require('urlencode')
const { RichEmbed } = require('discord.js')

async function ety(message) {
    // Initialize embed
    let embed = new RichEmbed()
    // Initialize result
    let result

    let argument = message.content.split(' ')[1][0]

    let requestQuery = urlencode(argument)
    let requestURL = `http://www.chaziwang.com/pic/ziyuanimg/${requestQuery}.png`
    
    try {
        result = await new Promise((resolve, reject) => {
            request(requestURL, function (error, response, body) {
                if (response.status === 200) {
                  console.log(response)
                  resolve(requestURL)
                } else {
                  reject(new Error('Character does not exist inside ``chaziwang.com`` database!'))
                }
              }) 
        })
    } catch(error) {
        result = error
    }

    //Check if URL or String
    // console.log(result)
    // if (result.includes('http')) {
    //     embed.setImage(result)
    // } else {
    //     embed.setDescription(result.name)
    // }
    // message.channel.send(embed)
}

module.exports = ety

