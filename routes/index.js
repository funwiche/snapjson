const express = require("express");
const router = express.Router();
router.get("/", (req, res) => res.render("index", { name: "Home" }));
router.get("/docs/:type?", (req, res) =>
  res.render("index", { name: req.params.type || "Home" })
);

module.exports = router;
