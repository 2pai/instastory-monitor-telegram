require('dotenv').config()
const fs = require('fs')
const express = require('express')
const app = express()

app.engine('html', require('ejs').renderFile)
app.get('/',(req,res) => {
    const metadataStory = JSON.parse(fs.readFileSync('./metadata-story.json', 'utf-8')) // load metadata
    res.render(__dirname + "/frontend/index.html", {metadataStory});
})

app.listen(process.env.PORT || 3555, () => {
    console.log("OK")
})