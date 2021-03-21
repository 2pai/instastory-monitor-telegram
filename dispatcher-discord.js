require('dotenv').config()

const {
    loadData,
    updateData,
} = require('./util')
const webhook = require("webhook-discord")
const webhookURL = process.env.DC_WEBHOOK_URL;
const Hook = new webhook.Webhook(webhookURL)

const metadataStory = loadData("./metadata-story.json");

metadataStory
    .map(story => {
        if (story.send_discord) return
        if (story.mediaType == 1) { // Image
            const msg = new webhook.MessageBuilder()
                .setName("SnapgramLord")
                .setColor("#aabbcc")
                .setImage(story.url)
                .setDescription(
                    `Timestamp : ${story.timestamp}\n`
                )

            Hook.send(msg)
                .then((data) => {
                    updateData("./metadata-story.json", story.id, true, "discord")
                }).catch((error) => {
                    console.log("failed to send: " + story.id)
                })
        } else if (story.mediaType == 2) {  // Videos
            
            const msg = new webhook.MessageBuilder()
                .setName("SnapgramLord")
                .setColor("#aabbcc")
                .setURL(story.url)
                .setDescription(
                    `Timestamp : ${story.timestamp}\n`
                )

            Hook.send(msg)
                .then((data) => {
                    updateData("./metadata-story.json", story.id, true, "discord")
                }).catch((error) => {
                    console.log("failed to send: " + story.id)
                })
        }
    })
