const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Product = require("../models/product");
const parsed = require("../utils/parsed");

router.get("", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Product.find(filter(req.query), project(req.query))
        .sort(sort(req.query))
        .skip(skip)
        .limit(limit),
      total: await Product.find(filter(req.query)).count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/autocomplete", async (req, res) => {
  const skip = parseInt(req.query.skip || "0");
  const limit = parseInt(req.query.limit || "12");
  try {
    res.status(200).json({
      items: await Product.find(
        { title: { $regex: req.query.q, $options: "i" } },
        { title: 1 }
      )
        .skip(skip)
        .limit(limit),
      total: await Product.find({
        title: { $regex: req.query.q, $options: "i" },
      }).count(),
      limit,
      skip,
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/categories", async (req, res) => {
  try {
    res.status(200).json(await Product.find().distinct("category"));
  } catch (err) {
    console.error(err);
  }
});
router.get("/brands", async (req, res) => {
  try {
    res.status(200).json(await Product.find().distinct("brand"));
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    res.status(200).json(await Product.findById(req.params.id));
  } catch (err) {
    console.error(err);
  }
});

router.post("", auth, async (req, res) => {
  try {
    const product = new Product({
      _id: (await Product.find().count()) + 1,
      ...req.body,
      user: req.user,
    });
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.sendStatus(404);
    res.status(200).json({ ...parsed(product), ...req.body });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.sendStatus(404);
    res.status(200).json({ ...parsed(product), isDeleted: true });
  } catch (err) {
    console.error(err);
  }
});
function project({ q }) {
  return q ? { score: { $meta: "textScore" } } : {};
}
function filter({ q, category, brand, plow, phigh }) {
  let price = {};
  q = q ? { $text: { $search: q } } : {};
  category = category ? { category: { $regex: category, $options: "i" } } : {};
  brand = brand ? { brand: { $regex: brand, $options: "i" } } : {};
  if (plow && phigh) price = { price: { $gte: plow, $lte: phigh } };
  else if (plow) price = { price: { $gte: plow } };
  else if (phigh) price = { price: { $lte: phigh } };
  return { ...q, ...category, ...brand, ...price };
}
function sort(query) {
  if (query.sort == "lowest-price") return { price: 1 };
  if (query.sort == "highest-price") return { price: -1 };
  if (query.sort == "lowest-rating") return { rating: 1 };
  if (query.sort == "highest-rating") return { rating: -1 };
  if (query.sort == "newly-listed") return { _id: 1 };
  if (query.sort == "name-ascending") return { title: 1 };
  if (query.sort == "name-descending") return { title: -1 };
  if (!query.sort && query.q) return { score: { $meta: "textScore" } };
  return { _id: 1 };
}
module.exports = router;
