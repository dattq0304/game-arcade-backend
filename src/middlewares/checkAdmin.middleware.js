const { UserModel } = require('../models');

const checkAdmin = async (req, res, next) => {
  const projection = { password: 0 };
  await UserModel.findById(req.userId, projection)
    .then(data => {
      if (data.role === 'admin') {
        next();
      } else {
        res.status(401).send('Not available!');
      }
    })
    .catch(err => {
      res.status(401).send('Not available!');
    });
};

module.exports = checkAdmin;