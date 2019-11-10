let dict = (message) => {
    // message.channel.send('Dict called')    

    message.channel.send('Type something..')
    .then(msg => {
        const filter = m => m.author === message.author
        const collector = msg.channel.createMessageCollector(filter, { time: 15000 });
        
        msg.channel.send('Message author: ' + msg.author)
        collector.on('collect', m => {
            msg.channel.send('m author: ' + m.author)
            msg.channel.send(`Collected ${m.content}`);
            collector.stop()
        });
        
        collector.on('end', collected => {
            msg.channel.send(`Collected ${collected.size} items`);
            msg.delete()
        });         
    })
    .catch(err => console.err)
   
}

module.exports = dict