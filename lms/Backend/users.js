const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

//creating schema
const usersSchema = new mongoose.Schema({
  username: { type: String,  unique: true },
  password: { type: String },
  email: { type: String,unique: true },
  first_name: { type: String},
  last_name: { type: String},
  Role: { type: String,enum: ['student', 'instructor', 'admin'] },
  profile: { type: String }
});

//create the user model

const Users = mongoose.model('Users', usersSchema);

router.get('/users', async (req, res) => {
  try {
    const foundUsers = await Users.find();
    res.send(foundUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/users', async (req, res) => {
  try {
    const { username, password, email, first_name, last_name, Role, profile } = req.body;

    // Create a new user object based on the provided data
    const newUser = new Users({
      username,
      password,
      email,
      first_name,
      last_name,
      Role,
      profile
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
