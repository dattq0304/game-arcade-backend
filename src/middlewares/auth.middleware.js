const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;

    next();
  } catch (err) {
    return res.status(401).send('Unauthorized');
  }
};

module.exports = checkAuth;