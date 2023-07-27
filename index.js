const express = require('express');
const app = express();
const get_movie = require('./get_movie');
const get_all_movies = require('./get_all_movies');
const get_videos_link = require('./get_videos_link');
const get_movie_byName = require('./get_movie_byName');

// Route to get all movies
app.get('/movies', async (req, res) => {
  const movies = await get_all_movies();
  console.log("movies:   ", movies);
  res.status(200).send(movies);
});

// Route to get a movie by link
app.get('/movies/:code/:name', async (req, res) => {
  const link = req.params.link;
  const movie = await get_movie(req.params.code, req.params.name);
  res.status(200).send(movie);
});

app.get('/movies/:code/:code2/:name', async (req, res) => {
  const videos = await get_videos_link(req.params.code, req.params.code2, req.params.name);
  res.status(200).send(videos);
});

// search by name
app.get('/movies/:name', async (req, res) => {
  const name = req.params.name;
  const movies = await get_movie_byName(name);
  res.status(200).send(movies);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
