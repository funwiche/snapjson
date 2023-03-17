const express = require("express");
const router = express.Router();
const Country = require("../models/country");

router.get("", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Country.find().skip(skip).limit(limit),
      total: await Country.find().count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await Country.findById(req.params.id));
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
