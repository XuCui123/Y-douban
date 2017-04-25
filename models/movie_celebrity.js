var mongoose = require('mongoose');
var MovieCelebritySchema = require('./schemas/movie_celebrity');
var MovieCelebrity = mongoose.model('MovieCelebrity', MovieCelebritySchema);

module.exports = MovieCelebrity;
