const mongoose = require("mongoose");
const uuid = require("uuid");

const movieSchema = mongoose.Schema({
  movie_id: {
    type: String,
    required: true,
    unique: true,
  },
  movie_title: {
    type: String,
    required: true,
    unique: true,
  },
  movie_year: {
    type: Number,
    required: true,
  },
  movie_rating: {
    type: Number,
    required: true,
  },
});

const movieModel = mongoose.model("movies", movieSchema);

const Movies = {
  addMovie: function (movie) {
    let movie_id = uuid.v4();
    movie.movie_id = movie_id;
    return movieModel
      .create(movie)
      .then((newMovie) => newMovie)
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getMovies: function () {
    return movieModel
      .find()
      .then((movies) => movies)
      .catch((err) => {
        throw new Error(err.message);
      });
  },
};

module.exports = {Movies};
