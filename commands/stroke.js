/*
    Import depedencies
*/
let request = require('request')
let cheerio = require('cheerio')
let urlencode = require('urlencode')


async function strokeOrder(message) {
    // Initialize
    let result

    // Get character from second array element of splitted string
    let character = message.content.split(' ')[1]

    if (character === undefined) {
        result = 'Character must not be empty'
        message.channel.send(result)
        return
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
                reject('Character doesn\'t exist')
            }

        }
        request(options, callback)
    })
    // Run request
    result = await requestPromise
    // Send stroke order .gif
    message.channel.send(result)         
}

module.exports = strokeOrder