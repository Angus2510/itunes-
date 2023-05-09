const express = require('express');

const router = express.Router()

router.get('/search/music', async (req, res) => {
  try {
    const term = req.params.term;
    const media = 'music';
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&media=${media}`);
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving music data from iTunes API');
  }
});

module.exports = router;
