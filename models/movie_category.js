var mongoose = require('mongoose');
var MovieCategorySchema = require('./schemas/movie_category');
var MovieCategory = mongoose.model('MovieCategory', MovieCategorySchema);

module.exports = MovieCategory;
