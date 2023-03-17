const express = require("express");
const router = express.Router();
const JWT = require("jsonwebtoken");
const User = require("../models/user");
const parsed = require("../utils/parsed");
const SECRET = process.env.ACCESS_TOKEN_SECRET;
const axios = require("axios");
router.get("", async (req, res) => {
  try {
    const { data } = await axios(
      "https://snap-assets.vercel.app/resources/comments.json"
    );
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
});

router.post("", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({
      $or: [{ email }, { username }],
      password,
    });
    if (!user) return res.sendStatus(404);
    const token = JWT.sign(user._id, SECRET);
    res.status(200).json({ ...parsed(user), token });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
