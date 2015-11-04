'use strict';
var ModelCar = require('../models/car');
var ModelComment = require('../models/comment');

module.exports.post = function(req, res, next) {

  var commentObj = req.body.comment;
  if (!commentObj) {
    return res.status(400).send('找不到合法数据.');
  }

  var carId = commentObj.car;

  if (!commentObj.commentid) {
    //新增评论
    var docComment = new ModelComment(commentObj);

    docComment.save(function(err, _comment) {
      if (err) {
        return next(err);
      }
      return res.redirect('/car/' + carId);

    });
  } else {
    console.log(commentObj);
    var commentId = commentObj.commentid;
    var fromUserId = commentObj.from;
    var toUserId = commentObj.to;
    var content = commentObj.content;

    ModelComment.findOne({
      _id: commentId
    }, function(err, _comment) {
      if (err) {
        return next(err);
      }

      _comment.reply.push({
        from: fromUserId,
        to: toUserId,
        content: content
      });

      _comment.save(function(err, _comment) {
        if (err) {
          return next(err);
        }
        return res.redirect('/car/' + carId);
      });

    });

  }

};
