const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const databaseUrl = process.env.DATABASE_URL;

//TO FIX THIS WARNING: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 ...
mongoose.set("strictQuery", false);

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*
{
    "_id" : "dfjashdfjhashdfjhas",
    "name" : "First Game",
    "category" : [
        "2 players",
        "action"
    ],
    "creator_id" : "_",
    "active" : false,
    "control" : "awds",
    "create_date" : ISODate("2023-04-17T00:00:00.000+0000"),
    "description" : "First Game",
    "modified_date" : ISODate("2023-04-17T00:00:00.000+0000"),
    "type" : "HTML5",
    "path" : "_"
}
*/

const GameSchema = new Schema(
  {
    _id: String,
    name: String,
    category: Array,
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
