// Read environment variables from .env file
require('dotenv').config()

// Import the discord.js module
const Discord = require('discord.js')

// Import the route.js module
let route = require('./commands/routes.js')

// Create an instance of a Discord client
const client = new Discord.Client();

// Client ready
client.on('ready', () => {
  console.log('I am ready!');
  client.user.setPresence({ game: { name: 'Type .help' }, status: 'online' })
});

// Create an event listener for messages
client.on('message', message => {
    route(message)
});

client.login(process.env.DISCORD_TOKEN);