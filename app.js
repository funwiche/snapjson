require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

// Global Middlewares
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(express.static(path.join(__dirname, "public")));

// Set Engine
app.set("view engine", "ejs");

// Routes
app.use("", require("./routes"));
app.use("/auth", require("./routes/auth"));
app.use("/cities", require("./routes/cities"));
app.use("/comments", require("./routes/comments"));
app.use("/countries", require("./routes/countries"));
app.use("/orders", require("./routes/orders"));
app.use("/posts", require("./routes/posts"));
app.use("/products", require("./routes/products"));
app.use("/quotes", require("./routes/quotes"));
app.use("/todos", require("./routes/todos"));
app.use("/users", require("./routes/users"));
app.get("**", async (req, res) => res.sendStatus(401));

// MongoDB Connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

// Start app
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
