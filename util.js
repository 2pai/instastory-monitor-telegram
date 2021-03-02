const fs = require('fs')
const fsp = require('fs-path')
const download = require('image-downloader')

const upsertDirectory = (path) => {
    if (!fs.existsSync(path)){
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
}

const downloadImage = (url, dir, filename) => {
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

module.exports = {
    storeData,
    loadData,
    downloadImage,
    upsertDirectory
}
    