const express = require('express');
const router = express.Router();
const app = express();

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

router.post('/search', async (req, res) => {
  const searchTerm = req.body.searchTerm;
  const mediaType = req.body.mediaType;

  if (mediaType === 'shortFilm') {
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}`);
      const data = await response.json();
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving data from iTunes API');
    }
  } else {
    res.status(400).send('Invalid media type');
  }
});

module.exports = router;
