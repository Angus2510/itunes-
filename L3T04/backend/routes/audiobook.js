const express = require('express');

const router = express.Router()

router.get('/audiobook/search', async (req, res) => {
  const { term, media } = req.query;

  try {
    if (media === 'audiobook') {
      const response = await fetch(`https://itunes.apple.com/search?term=${term}&media=${media}`);
      const data = await response.json();
      res.send(data);
    } else {
      res.status(400).send('Invalid media type');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
