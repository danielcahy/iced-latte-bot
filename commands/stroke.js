/*
    Import depedencies
*/
let request = require('request')
let cheerio = require('cheerio')
let urlencode = require('urlencode')


let strokeOrder = (message) => {
    // Get character from second array element of splitted string
    let character = message.content.split(' ')[1]
    // Encode character to URL readable
    let encodedCharacter = urlencode(character)
    // Set URL
    let url = `http://www.strokeorder.info/mandarin.php?q=${encodedCharacter}`
    // Options setup
    let options = {
        url: url,
        headers: {
            'User-Agent': 'request'
        }

    }
    // Callback setup
    let callback = (err, res, body) => {
        // Load body to cheerio
        const $ = cheerio.load(body)
        // Get .gif URL
        let imgURL = $('h1').next().attr('src')
        // Send stroke order .gif
        message.channel.send(imgURL)
    }
    // Run request
    request(options, callback)
    
}

module.exports = strokeOrder