const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Creating schema
const usersSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  email: { type: String, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  Role: { type: String, enum: ['student', 'instructor', 'admin'] },
  profile: { type: String }
});

// Create the user model
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

router.post('/register', async (req, res) => {
  try {
    const { username, password, email, first_name, last_name, Role, profile } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object based on the provided data
    const newUser = new Users({
      username,
      password: hashedPassword,
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

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user with the provided username
    const user = await Users.findOne({ username });

    // If user is not found, return error
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is not valid, return error
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Authentication succeeded, you can proceed with further actions (e.g., session creation)

    // Return success message or any other relevant data
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
