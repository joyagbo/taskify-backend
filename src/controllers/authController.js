const authService = require('../services/auth.service');


// Register a new user
exports.register = async (req, res) => {

    try {
        const { userId } = await authService.registerUser(req.body);

        res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Server error' });
    }

}

exports.login = async (req, res) => {

    try {
        const { token, userId, role } = await authService.loginUser(req.body);

        res.status(200).json({
            message: "Login successful",
            token,
            userId,
            role
        });

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Server error' });
    }
}