## Instagram Story Monitor
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
Monitor story your target instagram account & send to telegram on every update. This app also Inlcuding auto backup locally & frontend for local `metadata-story` explorer. 
## How To Use 📚
1. Clone this Repository
```
git clone https://github.com/2pai/instastory-monitor-telegram
```
2. Fill the .env file based on .env.example
```
cp .env.example .env
```
3. Install the dependency
```
npm install
```
4. Run the app in order
```bash
npm run collect  # collect instagram story metadata
npm run dispatch # dispatch / send instagram story to telegram
npm run download # download content locally
npm run frontend # run the frontend to serve metadata

```

## Architecture 🏹
![image](assets/Instagram-telegram.png)


### `collector.js`
This collector will be collect instagram story metadata from instagram private api then compare (with local metadata) & store/append it to `metadata-story.json`

The metadata structure will be 
```js
{
    id, // uniquie id
    url, // url content
    mediaType, // 1 for image, 2 for video
    path, // path to store content locally, format yyyy/M/dd
    timestamp,
    send, // status dispatcher
    downloaded, // status downloader
}
```
### `dispatcher.js`
This dispatcher will read the `metadata-story.json` and check if the `send` property was false then the dispatcher will send the media (based on media type) to the defined `chatId` telegram. 

If the dispatcher success send the media to the telegram, it will update the metadata `send` to true. 

### `downloader.js`
This downloader will read the `metadata-story.json` and check if the `downloaded` property was false then the downloader will download the media (based on media type) locally to the defined `path` on metadata, the path was using `yyyy/M/dd` to make searching the content more easy (if needed). 

If the downloader success download the media locally, it will update the metadata `downloaded` to true. 
### `index.js` (frontend)
Serve the `metadata-story.json` with simple frontend to make exploring the instagram story more easily. 

## Contributors ✨

Thanks goes to these wonderful people :

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/YogaSakti"><img src="https://avatars.githubusercontent.com/u/24309806?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Imperial Owl</b></sub></a><br /><a href="https://github.com/2pai/instastory-monitor-telegram/commits?author=YogaSakti" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/2pai"><img src="https://avatars.githubusercontent.com/u/22183588?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Iqbal syamil ayasy</b></sub></a><br /><a href="https://github.com/2pai/instastory-monitor-telegram/commits?author=2pai" title="Code">💻</a> <a href="https://github.com/2pai/instastory-monitor-telegram/commits?author=2pai" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!