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
  directors: Array,
  writers: Array,
  casts: Array,
  categories: Array,
  countries: Array,
  languages: Array,
  pubdate: String,
  durations: Array,
  aka: Array,
  images: Object,
  summay: String,
  rating: String,
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
