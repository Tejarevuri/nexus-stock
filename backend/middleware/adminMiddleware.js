const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

// IMPORTANT: Check this line. 
// It must be exported like this if you use { admin } to import it.
module.exports = { admin };