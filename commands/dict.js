let dict = (message) => {
    // message.channel.send('Dict called')    

    message.channel.send('Type something..')
    .then(msg => {
        const filter = m => m.author === message.author
        const collector = message.channel.createMessageCollector(filter, { time: 15000 });
        
        message.channel.send('Message author: ' + message.author)
        collector.on('collect', m => {
            message.channel.send('m author: ' + m.author)
            message.channel.send(`Collected ${m.content}`);
            collector.stop()
        });
        
        collector.on('end', collected => {
            message.channel.send(`Collected ${collected.size} items`);
        });         
    })
    .then(msg => {
        msg.delete()
    })
    .catch(err => message.channel.send(err))
   
}

module.exports = dict