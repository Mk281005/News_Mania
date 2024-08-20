const express = require('express');
   const rssParser = require('rss-parser');

   const app = express();
   const port = 3000;

   app.get('/api/rssFeed', async (req, res) => {
     try {
       const channelLink = req.query.channelLink;
       if (!channelLink) {
         return res.status(400).json({ error: 'Missing channelLink query parameter' });
       }

       const parser = new rssParser();
       const feed = await parser.parseURL(channelLink);

       // Format the RSS data into a JSON structure
       const rssData = {
         title: feed.title,
         description: feed.description,
         items: feed.items.map(item => ({
           title: item.title,
           link: item.link,
           description: item.contentSnippet,
           // Add other fields as needed
         }))
       };

       res.json(rssData);
     } catch (error) {
       console.error('Error fetching RSS data:', error);
       res.status(500).json({ error: 'Failed to fetch RSS data' });
     }
   });

   app.listen(port, () => {
     console.log(`Server listening on port ${port}`);
   });