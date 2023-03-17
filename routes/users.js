const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const User = require("../models/user");
const parsed = require("../utils/parsed");

router.get("", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await User.find().skip(skip).limit(limit),
      total: await User.find().count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await User.findById(req.params.id));
  } catch (err) {
    console.error(err);
  }
});

router.post("", async (req, res) => {
  try {
    const user = new User({
      _id: (await User.find().count()) + 1,
      ...req.body,
    });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
});

router.patch("", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return res.sendStatus(404);
    res.status(200).json({ ...parsed(user), ...req.body });
  } catch (err) {
    console.error(err);
  }
});

router.delete("", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return res.sendStatus(404);
    res.status(200).json({ ...parsed(user), isDeleted: true });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
