let dict = (message) => {
    // message.channel.send('Dict called')    


    const filter = (m) => {
        m.includes('huehue')
    }        
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });
    
    message.channel.send('Type something..')
    message.channel.send('Message author: ' + message.author)
    collector.on('collect', m => {
        message.channel.send('m author: ' + m.author)
        message.channel.send(`Collected ${m.content}`);
        collector.stop()
    });
    
    collector.on('end', collected => {
        message.channel.send(`Collected ${collected.size} items`);
    });    
}

module.exports = dict