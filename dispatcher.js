require('dotenv').config()

const {loadData, storeData, downloadImage, upsertDirectory} = require('./util')
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN_TELEGRAM;
const bot = new TelegramBot(token);
const chatID = process.env.CHAT_ID;

const metadataStory = loadData("./metadata-story.json");

// let updatedMetadataStory = [];

let updatedMetadataStory = metadataStory
.map(story => {
    if(!story.send){
        bot.sendPhoto(chatID, story.url)
        .then(() => {
            console.log("Send Success"+story.id)
            story.send = true;
            return story
        })
        .catch(() => {
            console.log("failed to send"+story.id)
            return story
        })
    }
    return story
})

    storeData("./metadata-story.json", updatedMetadataStory)