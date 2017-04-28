var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MovieSchema = new Schema({
  douban_id: {
    uniqe: true,
    type: String,
  },
  title: {
    uniqe: true,
    type: String
  },
  original_title: String,
  year: String,
  directors: [String],
  writers: [String],
  casts: [String],
  categories: [String],
  countries: [String],
  languages: [String],
  pubdate: String,
  durations: [String],
  aka: [String],
  images: Object,
  summay: String,
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
