const Parser = require('rss-parser');
const fs = require('fs');
const parser = new Parser();
import { useMyContext } from "./MyContext.js";

 const { state } = useMyContext();
async function readRSS() {
  const url = state.channelLink; 
  try {
    let feed = await parser.parseURL(url);

    // Map the feed items to a simpler JSON structure
    let feedItems = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      published: item.pubDate,
      summary: item.contentSnippet
    }));

    // Convert the mapped feed items to JSON
    let jsonData = JSON.stringify(feedItems, null, 2);

    // Write the JSON data to a file
    fs.writeFile('rss_feed_data.json', jsonData, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('RSS feed data has been saved as JSON.');
      }
    });
  } catch (error) {
    console.error('Error reading RSS feed:', error);
  }
}

readRSS();


