const fs = require('fs');
const downloadEmojiData = require('./downloadEmojiData');
const downloadVersionData = require('./downloadVersionData');

Promise.all([
  downloadEmojiData(),
  downloadVersionData()
]).then((data) => {
  const emojiData = data[0];
  const versionData = data[1];

  Object.keys(emojiData.descriptionsAndKeywords).forEach(
    key => emojiData.descriptionsAndKeywords[key].minVersion = versionData[key]
  );

  fs.writeFileSync(
    './src/data/emoji.json',
    JSON.stringify(emojiData, null, 2)
  );
}).catch(
  (e) => console.log('Error downloading data', e)
);
