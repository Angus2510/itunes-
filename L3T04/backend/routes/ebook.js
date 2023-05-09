const express = require('express');

const router = express.Router()

const app = express();

router.use(express.json());

router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const mediaType = 'ebook';

    const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}`);
    const data = await response.json();

    res.json(data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving search results');
  }
});

module.exports = router;
