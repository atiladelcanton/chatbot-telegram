
const TelegramBot = require('node-telegram-bot-api');
const dialogFlow = require('./dialogflow')
const youtube = require('./youtube')
const token = "8139610460:AAGHNBWI_LmnU06DdF4mkL6RzkhI5dX6_Uw";

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {

    const response = await dialogFlow.sendMessage(msg.chat.id.toString(), msg.text)
    
    let messageResponse = response.text;
    if (response.intent === 'Treino Especifico') {
        let { message, links } = await youtube.searchVideoUrl(messageResponse, response.fields.corpo.stringValue)
        bot.sendMessage(msg.chat.id, message)
        links.map(link => bot.sendMessage(msg.chat.id, link))
    } else {
        bot.sendMessage(msg.chat.id, messageResponse)
    }
});
