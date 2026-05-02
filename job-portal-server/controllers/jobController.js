const {
  createJob,
  deleteJob,
  findJobById,
  listJobs,
  updateJob,
} = require("../models/jobModel");
const { validateJobPayload } = require("../middleware/validate");

async function getJobs(req, res, next) {
  try {
    const jobs = await listJobs({
      status: req.query.status,
      search: req.query.search,
      sortBy: req.query.sortBy,
    });

    res.json(jobs);
  } catch (error) {
    next(error);
  }
}

async function getJobById(req, res, next) {
  try {
    const job = await findJobById(req.params.id);

    if (!job) {
      const error = new Error("Job not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
}

async function createJobPosting(req, res, next) {
  try {
    const payload = validateJobPayload(req.body);
    const job = await createJob({
      ...payload,
      createdBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
}

async function updateJobPosting(req, res, next) {
  try {
    const payload = validateJobPayload(req.body, { partial: true });
    const updatedJob = await updateJob(req.params.id, payload);

    if (!updatedJob) {
      const error = new Error("Job not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(updatedJob);
  } catch (error) {
    next(error);
  }
}

async function removeJobPosting(req, res, next) {
  try {
    const deleted = await deleteJob(req.params.id);

    if (!deleted) {
      const error = new Error("Job not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createJobPosting,
  getJobById,
  getJobs,
  removeJobPosting,
  updateJobPosting,
};
