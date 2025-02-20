const User = require('../models/userAuthorModel');

const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: 'Authorization failed' });
    }
};

module.exports = { verifyAdmin };
