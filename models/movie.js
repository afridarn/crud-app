const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  year: {
    type: Number,
  },
  character: {
    type: String,
  },
  rating: {
    type: String,
  },
});

module.exports = mongoose.model('Movie', movieSchema);