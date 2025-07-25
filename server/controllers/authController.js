const bcrypt = require('bcryptjs'); // for hashing passwords
const jwt = require('jsonwebtoken'); // for generating JWT tokens
const User = require('../models/User'); // User model


// Signup Endpoint Logic
exports.signup = async (req, res) => {
    const { email, password,} = req.body;

    try {
        // Check if user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashed = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            email,
            password: hashed
        });

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};

// Login Endpoint Logic
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};


