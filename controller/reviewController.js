const reviewService = require('./../services/reviewService');

module.exports = {
  getReview: (req, res, next) => {
    if (!req.body.courseId) req.body.courseId = req.params.courseId;
    const { populate = [] } = req.body;
    return reviewService
      .getReview(req.body.courseId, populate)
      .then((review) => {
        return res.status(200).json(review);
      });
  },
  addReview: (req, res, next) => {
    const review = req.body;
    if (!review.courseId) review.courseId = req.params.courseId;
    review.userId = res.locals.userId;
    return reviewService.addReview(review).then((review) => {
      return res.status(200).json(review);
    });
  },
};
