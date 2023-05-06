const auth = (req, res, next) => {
  const user = req.user;
  if (req.query.id === user._id || user.role === 'admin') next();
  else return res.status(401).send('Not available!');
};

module.exports = auth;