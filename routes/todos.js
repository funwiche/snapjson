const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Todo = require("../models/todo");
const parsed = require("../utils/parsed");

router.get("", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Todo.find().skip(skip).limit(limit),
      total: await Todo.find().count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await Todo.findById(req.params.id));
  } catch (err) {
    console.error(err);
  }
});

router.get("/user/:id", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Todo.find({ user: req.params.id }).skip(skip).limit(limit),
      total: await Todo.find({ user: req.params.id }).count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("", auth, async (req, res) => {
  try {
    const todo = new Todo({
      _id: (await Todo.find().count()) + 1,
      ...req.body,
      user: req.user,
    });
    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.sendStatus(404);
    res.status(200).json({ ...parsed(todo), ...req.body });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.sendStatus(404);
    res.status(200).json({ ...parsed(todo), isDeleted: true });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
