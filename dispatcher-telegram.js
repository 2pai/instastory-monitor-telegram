require('dotenv').config()
const {loadData, updateData} = require('./util')
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN_TELEGRAM;
const bot = new TelegramBot(token);
const chatID = process.env.CHAT_ID;

const metadataStory = loadData("./metadata-story.json");

metadataStory
    .map(story => {
        if (story.send_telegram) return
        if (story.mediaType == 1) { // Image
            bot.sendPhoto(chatID, story.url)
                .then((data) => {
                    console.log(`Success send ${story.id} to ${data.chat.title || data.chat.username || data.chat.first_name || data.chat.last_name} (${data.chat.id})`)
                    updateData("./metadata-story.json", story.id, true, "telegram")
                }).catch((error) => {
                    console.log(`failed to send ${story.id}`)
                })
        } else if (story.mediaType == 2) {  // Videos
            bot.sendVideo(chatID, story.url)
                .then((data) => {
                    console.log(`Success send ${story.id} to ${data.chat.title || data.chat.username || data.chat.first_name || data.chat.last_name} (${data.chat.id})`)
                    updateData("./metadata-story.json", story.id, true, "telegram")
                }).catch((error) => {
                    console.log(`failed to send ${story.id}`)
                })
        }
    })
