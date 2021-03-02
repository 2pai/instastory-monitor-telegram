const {loadData, storeData, downloadImage, upsertDirectory} = require('./util')


const story = loadData("metadata-story.json")

const storyDownloaded = story.map(content => {
    if(!content.downloaded){
        const dir = `./images/${content.path}`
        const filename = `${content.id}.jpg`
        upsertDirectory(dir)
        downloadImage(content.url, dir, filename)
        content.downloaded = true;
    }
    return content;
})

storeData("metadata-story.json", storyDownloaded)