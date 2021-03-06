const {loadData, storeData, downloadImage, upsertDirectory, downloadVideo} = require('./util')


const story = loadData("metadata-story.json")

const storyDownloaded = story.map(content => {
    if(!content.downloaded){
        if(content.mediaType == 1){ // image
            const dir = `./images/${content.path}`
            const filename = `${content.id}.jpg`
            upsertDirectory(dir)
            downloadImage(content.url, dir, filename).then(() => {
                content.downloaded = true;
            })
            content.downloaded = true;
        }else if(content.mediaType == 2){
            const dir = `./videos/${content.path}`
            const filename = `${content.id}.mp4`
            upsertDirectory(dir)
            downloadVideo(content.url, dir, filename)
            content.downloaded = true;
        }
    }
    return content;
})

storeData("metadata-story.json", storyDownloaded)