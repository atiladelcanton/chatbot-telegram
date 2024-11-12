const YouTube = require('youtube-node');
const configs = require('./yt-config.json')

const youTube = new YouTube();
youTube.setKey(configs.key);

function searchVideoUrl(message, queryText) {
  return new Promise((resolve, reject) => {
    youTube.search(`Exercicios para ${queryText}`, 2, function (error, result) {
      if (!error) {
        const videoIds = result.items.map((item) => item.id.videoId).filter(item => item)
        const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`)
        resolve({
          message: message,
          links: youtubeLinks
        })
      }
      else {
        reject()
      }
    });
  })

}
module.exports.searchVideoUrl = searchVideoUrl;