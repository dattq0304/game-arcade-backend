const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const router = require("./routes");

const app = express();
const port = process.env.PORT;

app.use(cors()); // enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'https://*.ngrok-free.app'],
  credentials: true
}));
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
