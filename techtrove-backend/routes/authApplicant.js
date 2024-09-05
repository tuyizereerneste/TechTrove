const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Applicant = require('../models/applicantUser');
const router = express.Router();

// Register Applicant
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, skills, experience, education, resume } = req.body;
    const applicant = await Applicant.findOne({ email });

    if (applicant) return res.status(400).json({ msg: 'User already exists' });

    const newApplicant = new Applicant({ name, email, password, skills, experience, education, resume });

    const salt = await bcrypt.genSalt(10);
    newApplicant.password = await bcrypt.hash(password, salt);

    await newApplicant.save();

    const payload = { id: newApplicant.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '23h' });

    res.json({ token, user: { id: newApplicant.id, name: newApplicant.name, email: newApplicant.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Login Applicant
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const applicant = await Applicant.findOne({ email });
  
      if (!applicant) return res.status(400).json({ msg: 'User does not exist' });
  
      const isMatch = await bcrypt.compare(password, applicant.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const payload = { id: applicant.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '23h' });
  
      res.json({ token, user: { id: applicant.id, name: applicant.name, email: applicant.email } });
      console.log("Applicant logged in successfully");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;