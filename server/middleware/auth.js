const jwt = require('jsonwebtoken');

//check token and sets req.user
exports.protect = (req, res, next) => {
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = auth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = decoded;
        next();
    });
};

// Middleware to check role
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};


