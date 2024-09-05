const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Applicant = require('../models/applicantUser');

// GET profile of the currently logged-in user
router.get('/profile', auth, async (req, res) => {
  try {
    // Retrieve the applicant's profile based on the user ID stored in req.user
    const applicant = await Applicant.findById(req.user.id).select('-password');

    // Check if applicant exists
    if (!applicant) {
      return res.status(404).json({ msg: 'Applicant not found' });
    }

    // If applicant exists, send the profile data
    res.json(applicant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/update', auth, async (req, res) => {
    try {
      const { name, skills, experience, education, resume } = req.body;
  
      const applicant = await Applicant.findById(req.user.id);
      if (!applicant) return res.status(404).json({ msg: 'User not found' });
  
      applicant.name = name || applicant.name;
      applicant.skills = skills || applicant.skills;
      applicant.experience = experience || applicant.experience;
      applicant.education = education || applicant.education;
      applicant.resume = resume || applicant.resume;
  
      await applicant.save();
  
      res.json(applicant);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/all-users', async (req, res) => {
    try {
      const users = await Applicant.find().select('-password');
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;