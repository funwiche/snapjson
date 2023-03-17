const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Order = require("../models/order");
const parsed = require("../utils/parsed");

router.get("", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Order.find().skip(skip).limit(limit),
      total: await Order.find().count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/user", auth, async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Order.find({ user: req.user }).skip(skip).limit(limit),
      total: await Order.find({ user: req.user }).count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await Order.findById(req.params.id));
  } catch (err) {
    console.error(err);
  }
});

router.post("", auth, async (req, res) => {
  try {
    const order = new Order({
      _id: (await Order.find().count()) + 1,
      ...req.body,
      user: req.user,
    });
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.sendStatus(404);
    res.status(200).json({ ...parsed(order), ...req.body });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.sendStatus(404);
    res.status(200).json({ ...parsed(order), isDeleted: true });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
