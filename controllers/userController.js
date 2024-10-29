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
    throw validationError;
  }

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const userExistsError = new Error("User already exists");
    userExistsError.statusCode = 400;
    throw userExistsError;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Convert the user object to JSON and exclude the password
  const userResponse = user.toObject();
  delete userResponse.password;

  // Send response with token and full user object (excluding password)
  res.status(201).json({
    token,
    user: userResponse,
  });
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const credentialsError = new Error("Invalid credentials");
    credentialsError.statusCode = 400;
    throw credentialsError;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const passwordError = new Error("Invalid credentials");
    passwordError.statusCode = 400;
    throw passwordError;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Convert user to plain object and exclude password
  const userResponse = user.toObject();
  delete userResponse.password;

  res.json({
    token,
    user: userResponse,
  });
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    const notFoundError = new Error("User not found");
    notFoundError.statusCode = 404;
    throw notFoundError;
  }

  // Convert user to plain object and exclude password
  const userResponse = user.toObject();
  delete userResponse.password;

  res.json(userResponse);
});

module.exports = { registerUser, loginUser, getUserProfile };
