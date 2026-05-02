const jwt = require("jsonwebtoken");

const { findUserById, sanitizeUser } = require("../models/userModel");

async function verifyToken(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "development-secret"
    );

    const user = await findUserById(decoded.userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = sanitizeUser(user);
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 401;
    }
    next(error);
  }
}

function authorizeRoles(...allowedRoles) {
  return (req, _res, next) => {
    // Role checks are layered after token verification on protected routes.
    if (!req.user) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      return next(error);
    }

    if (!allowedRoles.includes(req.user.role)) {
      const error = new Error("You do not have permission to access this resource");
      error.statusCode = 403;
      return next(error);
    }

    return next();
  };
}

module.exports = {
  authorizeRoles,
  protect: verifyToken,
  verifyToken,
};
