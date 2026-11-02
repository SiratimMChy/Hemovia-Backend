const { usersCollection } = require('../config/db');

// check if user is admin
const verifyAdmin = async (req, res, next) => {
    const email = req.decodedEmail;
    const query = { email: email };
    const user = await usersCollection.findOne(query);

    if (user?.role !== 'admin') {
        return res.status(403).send({ message: 'Forbidden access' });
    }
    next();
};

// check allowed roles
const verifyRole = (...roles) => {
    return async (req, res, next) => {
        const email = req.decodedEmail;
        const query = { email: email };
        const user = await usersCollection.findOne(query);

        if (!user || !roles.includes(user?.role)) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.userRole = user.role;
        next();
    };
};

module.exports = {
    verifyAdmin,
    verifyRole
};
