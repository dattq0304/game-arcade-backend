

const { response } = require('express');
const { UserModel } = require('../models');

// Get user info
const getUser = (req, res) => {
  try {
    const id = req.params.id;

    UserModel.findById(id)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get all user info
const getAllUsers = (req, res) => {
  try {
    UserModel.find({})
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new user
const createUser = (req, res) => {
  try {
    UserModel.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    })
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getUser,
  getAllUsers,
  createUser
}