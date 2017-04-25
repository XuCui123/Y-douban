var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieCelebritySchema = new Schema({
  douban_id: {
    uniqe: true,
    type: String
  },
  name: String,
  name_en: String,
  gender: String,
  constellayion: String,
  born_place: String,
  aka: String,
  aka_en: String,
  website: String,
  avatar: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    update: {
      type: Date,
      default: Date.now()
    }
  }
});

MovieCelebritySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

MovieCelebritySchema.statics = {
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

module.exports = MovieCelebritySchema;
