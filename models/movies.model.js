const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title."],
  },
  releaseYear: {
    type: Number,
    required: [true, "Please add the release year."],
  },
  genre: [{
    type: String,
    enum: ['Action', 'Drama', 'Comedy', 'Romance', 'Thriller', 'Fantasy', 'Sci-Fi', 'Horror', 'Sports', 'Musical', 'Other'],
    default: 'Drama'
  }],
  director: {
    type: String,
    required: [true, "Please mention who directed it."],
  },
  actors: [{
    type: String,
  }],
  language: {
    type: String,
    required: [true, "Please mention the language."],
  },
  country: {
    type: String,
    default: 'India',
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  plot: {
    type: String,
  },
  awards: {
    type: String,
  },
  posterUrl: {
    type: String,
  },
  trailerUrl: {
    type: String,
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User reference missing."]
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    review: {
      type: String,
      required: [true, "Please describe your review."]
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);