const fs = require('fs')
const fsp = require('fs-path')
const download = require('image-downloader')
const fetch = require('node-fetch')

const upsertDirectory = (path) => {
    if (!fs.existsSync(path)){
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
}

const downloadImage = async (url, dir, filename) => {
    const opt = { 
        url,
        dest: `${dir}/${filename}`,
        extractFilename: false
    }
    download.image(opt)
    .then(({ filename }) => {
        return true
      })
      .catch((err) => {
          console.error(err)
          return false
      })
}
const downloadVideo = async (url, dir, filename) => {
    const opt = { 
        url,
        dest: `${dir}/${filename}`
    }
    const response = await fetch(opt.url);
    const buffer = await response.buffer();

    fs.writeFile(opt.dest, buffer, () => true);                                          
 
}
const storeData = (path, data) => {
    try {
        fsp.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }
const loadData = (path) => {
    try {
      const data =  fs.readFileSync(path, 'utf8')
      return JSON.parse(data)
    } catch (err) {
      console.error(err)
      return false
    }
}
const updateData = function(path, id, value) {
    const data =  fs.readFileSync(path, 'utf8')
    const content = JSON.parse(data)
    content.forEach((s) => s.id === id && (s.send = value));
    fsp.writeFileSync(path, JSON.stringify(content))
};

module.exports = {
    storeData,
    loadData,
    updateData,
    downloadImage,
    downloadVideo,
    upsertDirectory
}
    