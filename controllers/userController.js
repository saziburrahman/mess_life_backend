const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const asyncHandler = require("express-async-handler");

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        const validationError = new Error(error.details[0].message);
        validationError.statusCode = 400;
        throw validationError; // Pass to error middleware
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const userExistsError = new Error("User already exists");
        userExistsError.statusCode = 400;
        throw userExistsError; // Pass to error middleware
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        const credentialsError = new Error("Invalid credentials");
        credentialsError.statusCode = 400;
        throw credentialsError; // Pass to error middleware
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const passwordError = new Error("Invalid credentials");
        passwordError.statusCode = 400;
        throw passwordError; // Pass to error middleware
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.json({ token });
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        const notFoundError = new Error("User not found");
        notFoundError.statusCode = 404;
        throw notFoundError; // Pass to error middleware
    }

    res.json(user);
});

module.exports = { registerUser, loginUser, getUserProfile };
