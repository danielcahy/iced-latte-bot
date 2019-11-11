const request = require('request')
const htmlToText = require('html-to-text')
const urlencode = require('urlencode')
const readlineSync = require('readline-sync')
const { RichEmbed } = require('discord.js')

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

    embed.setTitle(`Search result for ${argument}`)

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
        //Set description
        embed.setDescription('Select result for detail | Ex: ``1``')
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
            sanitizeItem(item)
            embed.addField(`${sum}. ${item.hanzi} - ${item.pinyin}`, `${item.meaning}`)
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
            sanitizeItem(item)
            embed.addField(`${sum}. ${item.hanzi} - ${item.pinyin}`, `${item.meaning}`)
          }
          resultLength = resultArray.length
        }

        message.channel.send(embed)
        .then(message1 => {
            const filter = m => m.author === message.author
            const collector = message1.channel.createMessageCollector(filter, { time: 15000 });
            
            collector.on('collect', async m => {
                if (Number(m) >= 1 && Number(m) <= resultLength) {
                    let embed = new RichEmbed()
                    let itemHash = resultArray[m-1][1]
                    let itemHanzi = resultArray[m-1][2]
                    let itemPinyin = resultArray[m-1][4]

                    await (async function sendDefinitions() {
                        embed.setTitle(`${itemHanzi} - ${itemPinyin}`)
                        embed.addField('DEFINITION(S)', '- -- --- ----- --------')
    
                        let requestURL = `https://dict.naver.com/linedict/267/cnen/entry/json/${itemHash}?defaultPron=US&hash=true&platform=isPC&dictType=cnen`
    
                        let resultObject = await new Promise((resolve, reject) => {
                            request(requestURL, function (error, response, body) {
                                let result = JSON.parse(body)
                                resolve(result)
                            })        
                        })

                        try {
                            let meanings = resultObject.meanList
                        } catch (error) {
                            console.log(error)
                            meanings = result.ob
                        }

                        
                        console.log(meanings)
                        if (meanings.length > 5) {
                            //Limit displays to 5
                            for (let i = 0; i < 5; i++) {
                                let item = {
                                    part: meanings[i].part,
                                    definition: meanings[i].mean
                                }
                                sanitizeItem(item)
                                embed.addField(item.part, item.definition)                                       
                            }
                        } else {
                            //Display for anything under 5
                            for (let meaning of meanings) {
                                let item = {
                                    part: meaning.part,
                                    definition: meaning.mean
                                }
                                sanitizeItem(item)
                                console.log(item)
                                embed.addField(item.part, item.definition)
                            }
                        }
                    })()
                    
                    await (async function sendExamples() {
                        embed.addField('EXAMPLE(S)', '- -- --- ----- --------')
                        let requestWords = urlencode(itemHanzi)
                        let requestURL = `https://dict.naver.com/linedict/267/cnen/entryExample/exampleJson?query=${requestWords}&dicType=cnen&platform=isPC`
                        
                        
                        let resultObject = await new Promise((resolve, reject) => {
                            request(requestURL, function (error, response, body) {
                                let result = JSON.parse(body)
                                resolve(result)
                            })        
                        })                        
                        
                        let examples = resultObject.searchExampleList

                        if (examples.length > 5) {
                            //Limits to 5
                            for (let i = 0; i < 5; i++) {
                                let item = {
                                    zhSentence: examples[i].example,
                                    pySentence: htmlToText.fromString(examples[i].pinyin),
                                    enSentence: htmlToText.fromString(examples[i].translation)
                                }
                                sanitizeItem(item)
                                embed.addField(`${item.zhSentence} - ${item.pySentence}`, `${item.enSentence}`)
                            }
                        } else {
                            //Displays
                            for (let example of examples) {
                                let item = {
                                    zhSentence: example.example,
                                    pySentence: htmlToText.fromString(example.pinyin),
                                    enSentence: htmlToText.fromString(example.translation)
                                }
                                sanitizeItem(item)
                                embed.addField(`${item.zhSentence} - ${item.pySentence}`, `${item.enSentence}`)
                            }
                        }
                    })()
                    //
                    message.channel.send(embed)
                }
                collector.stop()
            })
            
            collector.on('end', collected => {
                //
            })         
        })
        .catch(error => console.error)        
      } else {
        embed.setDescription(resultArray)
        message.channel.send(embed)
      }
}

let sanitizeItem = (object) => {
    for (let property in object) {
        if (object[property] === undefined) {
            object[property] = '-'
        }
    }
}

module.exports = dict