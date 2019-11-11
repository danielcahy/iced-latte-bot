const request = require('request')
const htmlToText = require('html-to-text')
const urlencode = require('urlencode')
const readlineSync = require('readline-sync')
const { RichEmbed } = require('discord.js');



async function dict(message) {
    // Initialize embed
    let embed = new RichEmbed()
    // Initialize result
    let result
       
    let queryStringParameters = {
        st: '011',
        r_lt: '000'
    }
    let argument = message.content.split(' ')[1] 

    embed.setTitle(`Search result for ``${argument}```)

    let searchQuery = urlencode(argument)
    let requestURL = `https://ac.dict.naver.com/linedictweb/ac?q=${searchQuery}&st=${queryStringParameters.st}&r_lt=${queryStringParameters.r_lt}&q_enc=UTF-8&r_format=json&r_enc=UTF-8`
    
    let resultArray

    try {
        resultArray = await new Promise((resolve, reject) => {
            request(requestURL, function (error, response, body) {
            try {
                let parsedBody = JSON.parse(body)
                let result = parsedBody.items[1]

                if (result.length < 1) {
                reject(new Error('Nothing came up for that search.'))
                } else {
                resolve(result)
                }
            } catch(error) {
                reject(error)
            }
            })    
        })
    } catch (error) {
        resultArray = error.message
    }

    if (typeof resultArray === 'object') {
        //Displays limited search result
        let resultLength = 0
        let maxResult = 10
        let sum = 0

        if (resultArray.length > maxResult) {
          for (let i = 0; i < maxResult; i++) {
            sum += 1
            let item = {
              hanzi: resultArray[i][2],
              pinyin: resultArray[i][4],
              meaning: resultArray[i][3]
            }
            embed.addField(`${sum}. ${item.hanzi} - ${item.pinyin}`, `${item.meaning}`)
            // console.log(sum)
            // console.log(`${item.hanzi} - ${item.pinyin} - ${item.meaning}`)
          }
          resultLength = maxResult
        } else {
          for (let array of resultArray) {
            sum += 1   
            let item = {
              hanzi: array[2],
              pinyin: array[4],
              meaning: array[3]
            }
            embed.addField(`${sum}. ${item.hanzi} - ${item.pinyin}`, `${item.meaning}`)
            // console.log(sum)
            // console.log(`${item.hanzi} - ${item.pinyin} - ${item.meaning}`)
          }
          resultLength = resultArray.length
        }
        //Selects
        // let selectedNumber = readlineSync.question(`Enter number: (1-${resultLength})`)
        // console.log(resultArray[selectedNumber-1])
    
        // //Gets data
        // let itemHash = resultArray[selectedNumber-1][1]
        // let requestURL = `https://dict.naver.com/linedict/267/cnen/entry/json/${itemHash}?defaultPron=US&hash=true&platform=isPC&dictType=cnen`
        // let resultObject = await new Promise((resolve, reject) => {
        //   request(requestURL, function (error, response, body) {
        //     let pOS = JSON.parse(body).meanList
        //     for (let item of pOS) {
        //       console.log(`${item.part} - ${item.mean}`)
        //     }
        //   })        
        // })
      } else {
        embed.setDescription(resultArray)
      }

      message.send(embed)









    // message.channel.send('Type something..') //Searching result..
    // .then(msg => {
    //     const filter = m => m.author === message.author
    //     const collector = msg.channel.createMessageCollector(filter, { time: 15000 });
        
    //     collector.on('collect', m => {
    //         //Stop collecting
    //         collector.stop()
    //     });
        
    //     collector.on('end', collected => {
    //         //Delete 'Searching result' message
    //         msg.delete()
    //     });         
    // })
    // .catch(err => console.err)
   
}

module.exports = dict