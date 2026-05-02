const {
  createApplication,
  findApplicationById,
  listApplicationsByUser,
  listApplicationsForAdmin,
} = require("../models/applicationModel");
const { findJobById } = require("../models/jobModel");

async function applyForJob(req, res, next) {
  try {
    const job = await findJobById(req.params.jobId);

    if (!job) {
      const error = new Error("Job not found");
      error.statusCode = 404;
      throw error;
    }

    const application = await createApplication({
      userId: req.user._id,
      jobId: req.params.jobId,
    });

    if (!application) {
      const error = new Error("You have already applied for this job");
      error.statusCode = 409;
      throw error;
    }

    res.status(201).json({
      ...application,
      job,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserApplications(req, res, next) {
  try {
    const applications = await listApplicationsByUser(req.user._id);
    res.json(applications);
  } catch (error) {
    next(error);
  }
}

async function getUserApplicationById(req, res, next) {
  try {
    const application = await findApplicationById(req.params.id, req.user._id);

    if (!application) {
      const error = new Error("Application not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
}

async function getAdminApplications(req, res, next) {
  try {
    const applications = await listApplicationsForAdmin();
    res.json(applications);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  applyForJob,
  getAdminApplications,
  getUserApplicationById,
  getUserApplications,
};
