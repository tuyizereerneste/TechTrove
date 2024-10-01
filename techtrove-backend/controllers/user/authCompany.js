import CampanyUser from '../../models/Company.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


class AuthCompany {

    static async companyRegister(req, res) {
        try {
            const { username, email, password, companyName } = req.body;
            const userCompany = await CampanyUser.findOne({ email });
        
            if (userCompany) return res.status(400).json({ msg: 'User already exists' });
        
            const newUser = new CampanyUser({ username, email, password, companyName });
        
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
        
            await newUser.save();
        
            const payload = { id: newUser.id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        
            res.json({ token, userCompany: { id: newUser.id, username: newUser.username, email: newUser.email, companyName: newUser.companyName } });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
    }

    static async companyLogin(req, res) {
        try {
            const { email, password } = req.body;
            const userCompany = await CampanyUser.findOne({ email });
        
            if (!userCompany) return res.status(400).json({ msg: 'User does not exist' });
        
            const isMatch = await bcrypt.compare(password, userCompany.password);
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
        
            const payload = { id: user.id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '23h' });
        
            res.json({ token, userCompany: { id: user.id, username: user.username, email: user.email, companyName: user.companyName } });
            console.log("User logged in successfuly");
        } catch (err) {
            res.status(500).json({ error: err.message });
          }
    }

    
}

export default AuthCompany;