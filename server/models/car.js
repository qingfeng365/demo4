'use strict';

var mongoose = require('mongoose');

var schemaCar = new mongoose.Schema({
  proTitle: String,
  brand: String,
  series: String,
  color: String,
  yearStyle: String,
  carModelName: String,
  ml: String,
  kw: String,
  gearbox: String,
  guidePrice: String,
  imageLogo: String,
  buyNum: {
    type: Number,
    default: 0
  },
  meta: {
    createDate: {
      type: Date,
      default: Date.now()
    },
    updateDate: {
      type: Date,
      default: Date.now()
    }
  }
});

// schemaCar.pre('save', function(next){
//   if(!this.isNew){
//     this.meta.updateDate = Date.now();
//   }
//   next();
// });

schemaCar.pre('findOneAndUpdate', function(next){
  this.update({},{$set:{'meta.updateDate':Date.now()}});
  next();
});

schemaCar.statics = {
	fetch: function(cb){
		return this
		  .find({})
		  .sort({'meta.createDate':1})
		  .exec(cb);
	},
	findById: function(id, cb) {
    return this
      .findOne({
        _id: id
      })
      .exec(cb);
  },
  getCount:function(cb){
    return this.count(cb);
  },
  findByPage:function(page,size,cb){
    return this
    .find({})
    .sort({'meta.createDate':1})
    .skip((page-1)*size)
    .limit(size)
    .exec(cb);
  }
};  



var ModelCar = mongoose.model('ModelCar',schemaCar, 'car');

module.exports = ModelCar;