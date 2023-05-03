const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const { UserModel } = require('../models');

// Get user info
const getUser = (req, res) => {
  try {
    const id = req.query.id;
    const user = id ? UserModel.findById(id) : UserModel.find({});
    user.then(data => {
      res.status(200).send(data);
    }).catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new user
const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const existingUser = await UserModel.findOne({ username: username });
    if (existingUser) {
      return res.status(409).send('This username already exists');
    }

    const existingEmail = await UserModel.findOne({ email: email });
    if (existingEmail) {
      return res.status(409).send('This email already exists');
    }

    const newUser = await UserModel.create({
      username: username,
      password: password,
      email: email,
      role: "user",
    });

    if (newUser) {
      return res.status(200).send({
        message: 'Register successfully',
        token: createToken(newUser),
      });
    } else {
      return res.status(403).send({
        message: 'Register failed',
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

// Login
const login = (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    UserModel.findOne({
      username: username,
      password: password
    })
      .then(data => {
        if (data) {
          return res.status(200).send({
            message: 'Login successfully',
            token: createToken(data),
          });
        } else {
          return res.status(403).send({
            message: 'Login failed',
          });
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

const createToken = (user) => {
  const payload = {
    userId: user._id,
    userName: user.username,
  };

  const options = {
    expiresIn: '240h',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

const logout = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }
};

module.exports = {
  getUser,
  register,
  login,
  logout,
}