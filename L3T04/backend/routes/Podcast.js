const express = require('express');

const app = express();
const router = express.Router()

router.get('/search', async (req, res) => {
  const term = req.query.term;
  const media = req.query.media;
  
  let endpoint = 'https://itunes.apple.com/search?term=' + term;
  
  if (media === 'podcast') {
    endpoint += '&media=podcast';
  }

  try {
    const response = await fetch(endpoint);
    const results = await response.json();
    res.json(results.results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


module.exports = router;
