require('dotenv').config()

const { loadData, storeData, downloadImage, upsertDirectory } = require('./util')
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN_TELEGRAM;
const bot = new TelegramBot(token);
const chatID = process.env.CHAT_ID;

const metadataStory = loadData("./metadata-story.json");

// let updatedMetadataStory = [];

let updatedMetadataStory = metadataStory
    .map(story => {
        try {
            if (story.send) return story
            if (story.mediaType == 1) {

                const sendMedia = bot.sendPhoto(chatID, story.url)
                if (sendMedia.ok) {
                    console.log("Send Success: " + story.id)
                    story.send = true;
                    story.msgId = data.message_id
                    return story
                }

            } else if (story.mediaType == 2) {

                const sendMedia = bot.sendVideo(chatID, story.url)
                if (sendMedia.ok) {
                    console.log("Send Success: " + story.id)
                    story.send = true;
                    story.msgId = data.message_id
                    return story
                }

            }
        } catch (error) {
            console.log("failed to send: " + story.id)
            console.error(error)
        }
        return story
    })

storeData("./metadata-story.json", updatedMetadataStory)