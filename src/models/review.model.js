const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const databaseUrl = process.env.DATABASE_URL;

// FIX THIS WARNING: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 ...
mongoose.set("strictQuery", false);

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ReviewSchema = new Schema(
  {
    user_id: String,
    game_id: String,
    star: Number,
    content: String,
    date: String,
  },
  {
    collection: "Reviews",
  }
);

const ReviewModel = mongoose.model("Reviews", ReviewSchema);

module.exports = ReviewModel;
