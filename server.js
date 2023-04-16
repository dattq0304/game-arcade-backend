const express = require("express");
const multer = require("multer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const recursive = require("recursive-copy");

const port = process.env.PORT;
const storagePath = process.env.PATH_TO_STORAGE;

// var indexRouter = require('../routes/index');
// var usersRouter = require('../routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// configure the store
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set the destination directory to the root of the upload folder
    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    // set the file name to be the same as the original file name
    cb(null, file.originalname);
  },
});

// configure the upload middleware
const upload = multer({ storage: storage });

app.post("/upload", upload.array("files"), (req, res) => {
  const filePaths = req.body.filePaths.split(",");
  filePaths.forEach((filePath) => console.log(filePath));

  res.send("Upload successful");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
