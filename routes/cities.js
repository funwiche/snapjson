const express = require("express");
const router = express.Router();
const City = require("../models/city");

router.get("", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  const q = req.query.q || "";
  const country = req.query.country || "";

  try {
    if (!country)
      return res.status(200).json({
        items: await City.find({ city: { $regex: q, $options: "i" } })
          .skip(skip)
          .limit(limit),
        total: await City.find({ city: { $regex: q, $options: "i" } }).count(),
        limit,
        skip,
      });
    res.status(200).json({
      items: await City.find({
        city: { $regex: q, $options: "i" },
        country: { $regex: country, $options: "i" },
      })
        .skip(skip)
        .limit(limit),
      total: await City.find({
        city: { $regex: q, $options: "i" },
        country: { $regex: country, $options: "i" },
      }).count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
