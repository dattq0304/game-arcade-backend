const express = require("express");
const path = require("path");
require("dotenv").config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const router = require("./routes");

const app = express();
const port = process.env.PORT;

// app.use(cors()); // enable CORS for all routes
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://*'],
//   credentials: true
// }));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
