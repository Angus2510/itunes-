const express = require('express');
const cors = require('cors');
const axios = require('axios');
const router = express.Router()

const app = express();
const port = 3001;

const all = require('./routes/all')
const audiobook = require('./routes/audiobook')
const ebook = require('./routes/ebook')
const Movie = require('./routes/Movie')
const Music = require('./routes/Music')
const Podcast = require('./routes/Podcast')
const shortfilm = require('./routes/shortfilm')
const software = require('./routes/software')
const tvShows= require('./routes/tvShow')

const createRoute = (path, component, options = {}) => ({
  path,
  component,
  ...options,
});

const routes = [
  createRoute('/all', all),
  createRoute('/audiobook', audiobook),
  createRoute('/ebook', ebook), // set additional options for this route
  createRoute('/Movie', Movie),
  createRoute('/Music', Music),
  createRoute('/Podcast', Podcast),
  createRoute('/shortfilm', shortfilm),
  createRoute('/software', software),
  createRoute('/tvShows', tvShows),
];

app.use(cors())
app.use('/all', all)
app.use('/audiobook', audiobook)
app.use('/ebook', ebook)
app.use('/Movie', Movie)
app.use('/Music', Music)
app.use('/Podcast', Podcast)
app.use('/shortfilm', shortfilm)
app.use('/software', software)
app.use('/tvShows', tvShows)

console.log(app._router)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });