import jwt from 'jsonwebtoken';


function verifyCompany(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        req.companies = { id: decoded.id };
        next();
        } catch (err) {
            res.status(400).json({ msg: 'Token is not valid' });
        }
}


export default verifyCompany;