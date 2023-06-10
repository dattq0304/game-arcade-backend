const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const databaseUrl = process.env.DATABASE_URL;

// FIX THIS WARNING: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 ...
mongoose.set("strictQuery", false);

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CommentSchema = new Schema(
  {
    create_date: String,
    game_id: String,
    user_id: String,
    content: String,
  },
  {
    collection: "Comments",
  }
);

const CommentModel = mongoose.model("Comments", CommentSchema);

module.exports = CommentModel;
