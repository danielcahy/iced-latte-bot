/*
    Import command modules
*/
let stroke = require('./stroke.js')
let help = require('./help.js')
let dict = require('./dict.js')
let ety = require('./ety.js')

/*
    Route commands
*/
let commands = {
    '.help': help,
    '.so': stroke,
    '.dict': dict,
    '.ety': ety
}

let routes = (message) => {
    // Get prefix from first array element of splitted string
    let prefix = message.content.split(' ')[0]

    // Run command if exists
    for (let property in commands) {
        if (prefix === property.toString()) {
            commands[property](message)
            break
        }
    }
}

module.exports = routes