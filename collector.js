require('dotenv').config()
const { IgApiClient } = require("instagram-private-api");
const fs = require('fs');
const { storeData, loadData } = require('./util');

function saveCred(data) {
  fs.writeFileSync("session.json", JSON.stringify(data))
  return data;
}

function credExist() {
  try {
    if (fs.existsSync("session.json")) {
      return true;
    }
  } catch (err) {
    console.error(err)
    return false;
  }
}

function credLoad() {
  const data = fs.readFileSync("session.json")
  // here you would load the data

  return JSON.parse(data);
};
(async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants; // this deletes the version info, so you'll always use the version provided by the library
    saveCred(serialized);
  });
  if (credExist()) {
    // import state accepts both a string as well as an object
    // the string should be a JSON object
    await ig.state.deserialize(credLoad());
  }

  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  const parsedTarget =  process.env.TARGET_USERNAME.split(",");
  const targets = await Promise.all(parsedTarget.map((target) => ig.user.searchExact(target))); // getting exact user by username

  targets.forEach(async (targetUser) => {
    const reelsFeed = ig.feed.reelsMedia({ // working with reels media feed (stories feed)
      userIds: [targetUser.pk], // you can specify multiple user id's, "pk" param is user id
    });
    const storyItems = await reelsFeed.items(); // getting reels, see "account-followers.feed.example.ts" if you want to know how to work with feeds
    if (storyItems.length === 0) return console.log(`${targetUser.username}'s story is empty`); // we can check items length and find out if the user does have any story to watch
    
    console.log(`Found ${storyItems.length} stories on ${targetUser.username}`)
    const storyMetadata = loadData("./metadata-story.json")
    const storyUID = loadData("./storyUID.json")
    
    Promise.all(storyItems
      .filter(stry => !storyUID.includes(stry.id)) // check if story is already exists
      .map(r => {
        const { taken_at, id, media_type } = r
        const dt = new Date(taken_at * 1000)
        const storyElementTarget = media_type == 1 ? r.image_versions2.candidates : r.video_versions
        storyUID.push(r.id)
        storyMetadata.push({
          username: targetUser.username,
          id,
          url: storyElementTarget[0].url,
          mediaType: media_type, // 1 for image, 2 for video
          path: dt.toLocaleDateString("eu-ES"), // make format yyyy/M/dd
          timestamp: dt.toLocaleString("id-ID"),
          send_telegram: false, //is story sended - telegram
          send_discord: false, //is story sended - discord
          downloaded: false,
        })
      })).then(() => {
      storeData("./storyUID.json", storyUID)
      storeData("./metadata-story.json", storyMetadata)
    })
  });

})();