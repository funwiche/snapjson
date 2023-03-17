const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Country",
  new mongoose.Schema(
    {
      _id: { type: Number, required: true },
      name: String,
      iso3: String,
      iso2: String,
      numeric_code: String,
      phone_code: String,
      capital: String,
      currency: String,
      currency_name: String,
      currency_symbol: String,
      tld: String,
      native: String,
      region: String,
      subregion: String,
      timezones: Array,
    },
    { versionKey: false }
  )
);
