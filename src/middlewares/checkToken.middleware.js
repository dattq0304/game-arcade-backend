const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const checkToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('Token is required');
    }

    const decoded = jwt.verify(token, secret);
    req.userId = decoded._id;

    next();
  } catch (err) {
    return res.status(401).send('Token is required');
  }
};

module.exports = checkToken;