require('dotenv').config()

const {
    loadData,
    storeData,
    updateData,
    downloadImage,
    upsertDirectory
} = require('./util')
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN_TELEGRAM;
const bot = new TelegramBot(token);
const chatID = process.env.CHAT_ID;

const metadataStory = loadData("./metadata-story.json");

metadataStory
    .map(story => {
        if (story.send) return
        if (story.mediaType == 1) {
            bot.sendPhoto(chatID, story.url)
                .then((data) => {
                    console.log("Success send " + story.id + " to " + data.chat.title + " (" + data.chat.id + ")")
                    updateData("./metadata-story.json", story.id, true)
                }).catch((error) => {
                    console.log("failed to send: " + story.id)
                    console.error(error)
                })
        } else if (story.mediaType == 2) {
            bot.sendVideo(chatID, story.url)
                .then((data) => {
                    console.log("Success send " + story.id + " to " + data.chat.title + " (" + data.chat.id + ")")
                    updateData("./metadata-story.json", story.id, true)
                }).catch((error) => {
                    console.log("failed to send: " + story.id)
                    console.error(error)
                })
        }
    })

// storeData("./metadata-story.json", updatedMetadataStory)