const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const databaseUrl = process.env.DATABASE_URL;

//TO FIX THIS WARNING: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 ...
mongoose.set("strictQuery", false);

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new Schema(
  {
    _id: String,
    username: String,
    password: String,
    email: String,
    role: String,
    gameUploadedId: Array,
  },
  {
    collection: "Users",
  }
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
