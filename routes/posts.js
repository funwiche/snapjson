const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Post = require("../models/post");
const parsed = require("../utils/parsed");

router.get("", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Post.find(filter(req.query), project(req.query))
        .sort(sort(req.query))
        .skip(skip)
        .limit(limit),
      total: await Post.find(filter(req.query)).count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await Post.findById(req.params.id));
  } catch (err) {
    console.error(err);
  }
});

router.get("/user/:id", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Post.find({ user: req.params.id }).skip(skip).limit(limit),
      total: await Post.find({ user: req.params.id }).count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("", auth, async (req, res) => {
  try {
    const post = new Post({
      _id: (await Post.find().count()) + 1,
      ...req.body,
      user: req.user,
    });
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    res.status(200).json({ ...parsed(post), ...req.body });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    res.status(200).json({ ...parsed(post), isDeleted: true });
  } catch (err) {
    console.error(err);
  }
});
function project({ q }) {
  return q ? { score: { $meta: "textScore" } } : {};
}
function filter({ q, category }) {
  q = q ? { $text: { $search: q } } : {};
  category = category ? { category: { $regex: category, $options: "i" } } : {};
  return { ...q, ...category };
}
function sort(query) {
  if (query.sort == "newly-listed") return { _id: 1 };
  if (query.sort == "name-ascending") return { title: 1 };
  if (query.sort == "name-descending") return { title: -1 };
  if (!query.sort && query.q) return { score: { $meta: "textScore" } };
  return { _id: 1 };
}
module.exports = router;
