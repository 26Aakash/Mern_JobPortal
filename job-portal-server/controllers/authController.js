const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createUser,
  findUserByEmail,
  sanitizeUser,
  updateUserProfile,
} = require("../models/userModel");
const {
  validateAuthPayload,
  validateProfilePayload,
} = require("../middleware/validate");

function signToken(user) {
  return jwt.sign(
    {
      userId: String(user._id),
      email: user.email,
      role: user.role || "user",
    },
    process.env.JWT_SECRET || "development-secret",
    { expiresIn: "7d" }
  );
}

async function register(req, res, next) {
  try {
    const { name, email, password, role } = validateAuthPayload(req.body, true);
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      const error = new Error("An account with this email already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      token: signToken(user),
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = validateAuthPayload(req.body, false);
    const user = await findUserByEmail(email);

    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    res.json({
      token: signToken(user),
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
}

async function getCurrentUser(req, res) {
  res.json({ user: req.user });
}

async function updateProfile(req, res, next) {
  try {
    const payload = validateProfilePayload(req.body);
    const updatedUser = await updateUserProfile(req.user._id, payload);

    if (!updatedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({
      user: sanitizeUser(updatedUser),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCurrentUser,
  login,
  register,
  updateProfile,
};
