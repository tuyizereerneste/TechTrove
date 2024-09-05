const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register Company User
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, companyName } = req.body;
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({ username, email, password, companyName });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const payload = { id: newUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: newUser.id, username: newUser.username, email: newUser.email, companyName: newUser.companyName } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all company users
router.get('/all-companies', async (req, res) => {
  try {
    const companies = await User.find().select('-password');
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '23h' });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email, companyName: user.companyName } });
    console.log("User logged in successfuly");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;