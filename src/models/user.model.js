const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const databaseUrl = process.env.DATABASE_URL;

// FIX THIS WARNING: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 ...
mongoose.set("strictQuery", false);

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    role: String,
    create_date: String,
    profile_image: String,
  },
  {
    collection: "Users",
  }
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
