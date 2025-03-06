/**
 * Express router providing comment related routes.
 * @module routes/api/comments
 */

const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

/**
 * Route serving a list of comments.
 * @name get/comments
 * @function
 * @memberof module:routes/api/comments
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
router.get("/", (req, res, next) => {
  Comment.find()
    .then((comments) => {
      res.json({ comments });
    })
    .catch(next);
});

/**
 * Route to delete a comment by ID.
 * @name delete/comments/:id
 * @function
 * @memberof module:routes/api/comments
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws Will throw an error if the comment deletion fails.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
