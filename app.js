/* DISCORD */
require('dotenv').config()
const Discord = require('discord.js')
const route = require('./commands/routes.js')

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Discord ready');
  client.user.setPresence({ game: { name: 'Type .help' }, status: 'online' })
});

client.on('message', message => {
    route(message)
});
client.login(process.env.DISCORD_TOKEN);


/* Express API */
const fs = require('fs')
const cors = require('cors')
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = process.env.PORT || 3000;
const data = fs.readFileSync('graphics.txt');

let whitelist = ['http://127.0.0.1:5500']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback('You don\'t have a permission to acces this API')
    }
  }
}

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Express ready on port: ${port}!`))
// Hanzi API
let hanziString = data.toString()
let hanziStringsArray = hanziString.split('\n')
hanziStringsArray.pop()
let hanziObjectsArray = hanziStringsArray.map(JSON.parse)

app.get("/hanzi/:c", function (req, res) {
  let characters = req.params.c.split('')
  chracters = characters.slice(0, 10)
  let charactersArray = []

  for (let i of characters) {
    let object
    for (let j of hanziObjectsArray) {
      if (j.character === i) {
        object = j
      }
    }
    if (object) {
      charactersArray.push(object)
    } else {
      charactersArray.push(`Invalid character input: ${i}`)
    }
  }
  res.send(charactersArray)
});


