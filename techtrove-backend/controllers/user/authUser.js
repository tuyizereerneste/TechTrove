import Applicant from '../../models/applicantUser.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


class AuthUser {
    static async registerUser(req, res) {
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
        
            return res.json({ token, user: { id: newApplicant.id, name: newApplicant.name, email: newApplicant.email } });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const applicant = await Applicant.findOne({ email });
        
            if (!applicant) 
            return res.status(400).json({ msg: 'User does not exist' });
        
            const isMatch = await bcrypt.compare(password, applicant.password);
            if (!isMatch)
            return res.status(400).json({ msg: 'Invalid credentials' });
        
            const payload = { id: applicant.id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '23h' });

            res.json({ token, user: { id: applicant.id, name: applicant.name, email: applicant.email } });
            console.log("Applicant logged in successfully");
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async userProfile(req, res) {
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
    }

    static async userUpdate(req, res) {
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
    }
}

export default AuthUser;