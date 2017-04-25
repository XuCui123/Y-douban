var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MovieCategorySchema = new Schema({
  name: {
    uniqe: true,
    type: String
  },
  movies: [{type: ObjectId, ref: 'Movie'}],
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

MovieCategorySchema.pre('save', function (next) {
  if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now()
	}
	next();
});

MovieCategorySchema.statics = {
  fetch: function(callback) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(callback)
  },
  findById: function(id, callback) {
    return this
      .findOne({_id: id})
      .exec(callback)
  }
}

module.exports = MovieCategorySchema;
