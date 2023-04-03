const Comment = require("../models/comment.model");

exports.comment = async (req, res, next) => {
  if (req.body.email && req.body.comment) {
    const cmt = {
      id: Date.now().toString(),
      author: req.body.email,
      comment: req.body.comment,
    };
    console.log(cmt);
    await Comment.insertMany([cmt]);
    // console.log("12", req.session.user);
    // req.session.comments.push(cmt);
    next();
  } else {
    console.log("value undefined");
    res.render("err");
  }
};

exports.showCmt = (req, res, next) => {
  Comment.find({}).then((cmt) => {
    if (cmt) {
      // console.log(cmt);
      req.session.comments = cmt;
      next();
    } else {
      req.locals.comments = null;
    }
  });
};

exports.deleteCmt = (req, res, next) => {
  try {
    Comment.deleteOne({ _id: req.params.id })
    .then(result => {
        console.log(41, result);
        next();
    })
  } catch (error) {
    console.log(error);
    res.render("err");
  }
};
