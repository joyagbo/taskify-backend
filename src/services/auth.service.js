
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class authError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}

exports.registerUser = async (body) => {
    const { name, email, password } = body;
    if (!name || !email || !password) {
        throw new authError("Name, email, and password are required", 400);
    }
    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new authError("User already exists", 400)
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })
    return { userId: user._id };

}

exports.loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw new authError("Email and password are required", 400);
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new authError("User not found", 401);
    }

    //check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new authError("invalid password", 401)
    }


    // generate jwt token
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return {
        token,
        userId: user._id,
        role: user.role
    }
}