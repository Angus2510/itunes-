const express = require('express');


const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/search', async (req, res) => {
  const { searchTerm } = req.body;
  const mediaTypes = ['movie', 'podcast', 'music', 'audiobook', 'shortFilm', 'tvShow', 'software', 'ebook'];
  const results = [];

  try {
    // Search for each media type
    for (const mediaType of mediaTypes) {
      const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}`);
      const data = await response.json();
      // Add results to array if there are any
      if (data.results && data.results.length) {
        results.push({ mediaType, data: data.results });
      }
    }
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error searching iTunes API');
  }
});

module.exports = router;
