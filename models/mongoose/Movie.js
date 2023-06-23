const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  advance: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  genres: [
    {
      name: { type: String, required: true },
    },
  ],
  age: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  category: {
    type: { type: Number, required: true },
  },
  cast: {
    type: String,
    required: true,
  },
  totalViews: {
    type: Number,
    default: 0,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
