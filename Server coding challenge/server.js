const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require("./config");
const cors = require("./middleware/cors");
const { Movies } = require("./models/moviedex-model");
const validateToken = require("./middleware/token-validation");
const app = express();

app.use(cors);
app.use(validateToken);

app.post("/api/add-movie/", jsonParser, (req, res) => {
  let movie_title = req.body.movie_title;
  let movie_year = req.body.movie_year;
  let movie_rating = req.body.movie_rating;

  if (!movie_rating || !movie_title || !movie_year) {
    res.statusMessage =
      "You need to send all movie fields to add the movie to the movie list";
    return res.status(403).end();
  }

  movie = {
    movie_title,
    movie_year,
    movie_rating,
  };

  Movies.addMovie(movie)
    .then((newMovie) => {
      return res.status(201).json(newMovie);
    })
    .catch((err) => {
      res.statusMessage = err;
      return res.status(500);
    });
});

app.get("/api/movies/", (req, res) => {
  Movies.getMovies()
    .then((movies) => {
      if (!movies.length) {
        res.statusMessage = "No movies found in the moviedex";
        return res.status(404).end();
      }
      return res.status(200).json(movies);
    })
    .catch((err) => {
      res.statusMessage = err;
      return res.status(500);
    });
});

app.listen(PORT, () => {
  console.log("This server is running on port 8080");
  new Promise((resolve, reject) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(DATABASE_URL, settings, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log("Database connected successfully.");
        return resolve();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});
