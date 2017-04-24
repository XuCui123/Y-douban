var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  name: {
    uniqe: true,
    type: String
  },
  director: String,
  screenwriter: String,
  actor: String,
  categories: String,
  country: String,
  language: String,
  year: String,
  duration: String,
  alias: String,
  post: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

MovieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

MovieSchema.statics = {
  fetch: function (callback) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(callback);
  },
  findById: function (id, callback) {
    return this
      .findOne({_id: id})
      .exec(callback);
  }
}

module.exports = MovieSchema;
