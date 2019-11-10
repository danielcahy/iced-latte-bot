let dict = (message) => {
    // message.channel.send('Dict called')    


    const filter = m => m.content.includes('discord');
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });
    
    message.channel.send('Type something..')
    collector.on('collect', m => {
        console.log(`Collected ${m.content}`);
        collector.stop()
    });
    
    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });    
}

module.exports = dict