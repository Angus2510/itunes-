const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/software/search', async (req, res) => {
  const searchTerm = req.query.term;
  const mediaType = req.query.media;

  if (mediaType !== 'software') {
    return res.status(400).send('Invalid media type');
  }

  try {
    const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}`);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;
