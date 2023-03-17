const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Quote = require("../models/quote");
const parsed = require("../utils/parsed");

router.get("", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Quote.find().skip(skip).limit(limit),
      total: await Quote.find().count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await Quote.findById(req.params.id));
  } catch (err) {
    console.error(err);
  }
});

router.post("", auth, async (req, res) => {
  try {
    const quote = new Quote({
      _id: (await Quote.find().count()) + 1,
      ...req.body,
    });
    res.status(200).json(quote);
  } catch (err) {
    console.error(err);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.sendStatus(404);
    res.status(200).json({ ...parsed(quote), ...req.body });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.sendStatus(404);
    res.status(200).json({ ...parsed(quote), isDeleted: true });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
