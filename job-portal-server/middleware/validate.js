const USER_ROLES = ["admin", "recruiter", "user"];
const JOB_POSTING_STATUSES = ["Open", "Closed"];
const APPLICATION_STATUSES = ["Applied", "Reviewed", "Rejected", "Selected"];

function createValidationError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateAuthPayload(payload, isRegister = false) {
  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();
  const password = payload.password;
  const role = payload.role?.trim().toLowerCase() || "user";

  if (isRegister && !name) {
    throw createValidationError("Name is required");
  }

  if (!email) {
    throw createValidationError("Email is required");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw createValidationError("Please enter a valid email address");
  }

  if (!password || password.length < 6) {
    throw createValidationError("Password must be at least 6 characters long");
  }

  if (isRegister && !USER_ROLES.includes(role)) {
    throw createValidationError("Please choose a valid role");
  }

  return { name, email, password, role };
}

function validateJobPayload(payload, { partial = false } = {}) {
  const normalized = partial
    ? {}
    : {
        companyName: payload.companyName?.trim(),
        role: payload.role?.trim(),
        description: payload.description?.trim() || "",
        salary: payload.salary?.toString().trim() || "",
        location: payload.location?.trim() || "",
        status: payload.status?.trim() || "Open",
      };

  if (partial && payload.companyName !== undefined) {
    normalized.companyName = payload.companyName?.trim();
  }

  if (partial && payload.role !== undefined) {
    normalized.role = payload.role?.trim();
  }

  if (partial && payload.description !== undefined) {
    normalized.description = payload.description?.trim() || "";
  }

  if (partial && payload.salary !== undefined) {
    normalized.salary = payload.salary?.toString().trim() || "";
  }

  if (partial && payload.location !== undefined) {
    normalized.location = payload.location?.trim() || "";
  }

  if (partial && payload.status !== undefined) {
    normalized.status = payload.status?.trim();
  }

  if (!partial || payload.companyName !== undefined) {
    if (!normalized.companyName) {
      throw createValidationError("Company name is required");
    }
  }

  if (!partial || payload.role !== undefined) {
    if (!normalized.role) {
      throw createValidationError("Role is required");
    }
  }

  if (!partial || payload.description !== undefined) {
    if (!normalized.description) {
      throw createValidationError("Description is required");
    }
  }

  if ((!partial || payload.status !== undefined) && !JOB_POSTING_STATUSES.includes(normalized.status)) {
    throw createValidationError("Please choose a valid job status");
  }

  return normalized;
}

function validateProfilePayload(payload) {
  const name = payload.name?.trim();

  if (!name) {
    throw createValidationError("Name is required");
  }

  return { name };
}

module.exports = {
  APPLICATION_STATUSES,
  JOB_POSTING_STATUSES,
  USER_ROLES,
  createValidationError,
  validateAuthPayload,
  validateJobPayload,
  validateProfilePayload,
};
