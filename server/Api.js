const express = require('express');
//const router = express.Router();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/username/:username', async (req, res) => {
  try {
    const username = req.params.username
    // Replace with the desired Twitter username
    const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAL%2FHnwEAAAAAvJkoo9dL0RkrfDftS5EZDtuMV7c%3DOdt73lTk7pbJZV94Ml80ZXke78u0Evz3I7Alx8oyVV02EtoI26'; // Replace with your Bearer Token

    const response = await fetch(`https://api.twitter.com/2/users/by/username/${username}?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Twitter user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/userId/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Replace with your actual Bearer Token obtained from the Twitter Developer Account
    const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAL%2FHnwEAAAAAvJkoo9dL0RkrfDftS5EZDtuMV7c%3DOdt73lTk7pbJZV94Ml80ZXke78u0Evz3I7Alx8oyVV02EtoI26';

    const response = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=from:${userId}&max_results=100&tweet.fields=created_at&user.fields=username&expansions=attachments.media_keys&media.fields=url`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Twitter user data');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Twitter user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

app.get('/tweetInfo/:tweetid', async (req, res) => {
  try {
    const tweetid = req.params.tweetid
    // Replace with the desired Twitter username
    const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAL%2FHnwEAAAAAvJkoo9dL0RkrfDftS5EZDtuMV7c%3DOdt73lTk7pbJZV94Ml80ZXke78u0Evz3I7Alx8oyVV02EtoI26'; // Replace with your Bearer Token

    const response = await fetch(`https://api.twitter.com/2/tweets?ids=${tweetid}&tweet.fields=public_metrics&expansions=attachments.media_keys&media.fields=public_metrics`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Twitter user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const port = 5000; // specify the port number you want to use
app.listen(port, () => {
    console.log(`Listening on sever http://localhost:${port}`);
});