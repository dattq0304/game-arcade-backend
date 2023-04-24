const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const databaseUrl = process.env.DATABASE_URL;

// FIX THIS WARNING: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 ...
mongoose.set("strictQuery", false);

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const GameSchema = new Schema(
  {
    name: String,
    category: String,
    creator_id: String,
    active: Boolean,
    control: String,
    description: String,
    create_date: String,
    modified_date: String,
    type: String,
    path: String,
  },
  {
    collection: "Games",
  }
);

const GameModel = mongoose.model("Games", GameSchema);

module.exports = GameModel;
