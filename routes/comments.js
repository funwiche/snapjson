const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Comment = require("../models/comment");
const parsed = require("../utils/parsed");

router.get("", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Comment.find().skip(skip).limit(limit),
      total: await Comment.find().count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await Comment.findById(req.params.id));
  } catch (err) {
    console.error(err);
  }
});

router.get("/user/:id", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Comment.find({ user: req.params.id })
        .skip(skip)
        .limit(limit),
      total: await Comment.find({ user: req.params.id }).count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});
router.get("/post/:id", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Comment.find({ post: req.params.id })
        .skip(skip)
        .limit(limit),
      total: await Comment.find({ post: req.params.id }).count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("", auth, async (req, res) => {
  try {
    const comment = new Comment({
      _id: (await Comment.find().count()) + 1,
      ...req.body,
      user: req.user,
    });
    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
  }
});
router.patch("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.sendStatus(404);
    res.status(200).json({ ...parsed(comment), ...req.body });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.sendStatus(404);
    res.status(200).json({ ...parsed(comment), isDeleted: true });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
