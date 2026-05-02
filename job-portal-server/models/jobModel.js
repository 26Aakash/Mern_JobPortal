const crypto = require("crypto");
const { ObjectId } = require("mongodb");

const { getDatabase } = require("../config/db");

const memoryJobs = [];

function getJobsCollection() {
  const db = getDatabase();
  return db ? db.collection("jobs") : null;
}

function normalizeJob(job) {
  if (!job) {
    return null;
  }

  return {
    ...job,
    _id: String(job._id),
    createdBy: job.createdBy ? String(job.createdBy) : null,
  };
}

function sortJobs(items, sortBy = "newest") {
  const jobs = [...items];

  jobs.sort((left, right) => {
    const leftDate = new Date(left.createdAt || 0).getTime();
    const rightDate = new Date(right.createdAt || 0).getTime();
    return sortBy === "oldest" ? leftDate - rightDate : rightDate - leftDate;
  });

  return jobs;
}

function filterMemoryJobs(jobs, { status, search }) {
  return jobs.filter((job) => {
    const matchesStatus = !status || job.status === status;
    const haystack = `${job.companyName} ${job.role} ${job.location}`.toLowerCase();
    const matchesSearch =
      !search || haystack.includes(search.trim().toLowerCase());

    return matchesStatus && matchesSearch;
  });
}

async function createJob(jobInput) {
  const collection = getJobsCollection();
  const job = {
    ...jobInput,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (!collection) {
    const storedJob = { ...job, _id: crypto.randomUUID() };
    memoryJobs.push(storedJob);
    return normalizeJob(storedJob);
  }

  const document = {
    ...job,
    createdBy: new ObjectId(job.createdBy),
  };

  const result = await collection.insertOne(document);
  return normalizeJob({ ...document, _id: result.insertedId });
}

async function listJobs({ status, search, sortBy }) {
  const collection = getJobsCollection();

  if (!collection) {
    return sortJobs(filterMemoryJobs(memoryJobs, { status, search }), sortBy).map(
      normalizeJob
    );
  }

  const query = {};

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { companyName: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  const direction = sortBy === "oldest" ? 1 : -1;
  const jobs = await collection.find(query).sort({ createdAt: direction }).toArray();
  return jobs.map(normalizeJob);
}

async function findJobById(id) {
  const collection = getJobsCollection();

  if (!collection) {
    return normalizeJob(memoryJobs.find((job) => String(job._id) === String(id)));
  }

  if (!ObjectId.isValid(id)) {
    return null;
  }

  const job = await collection.findOne({ _id: new ObjectId(id) });
  return normalizeJob(job);
}

async function updateJob(id, updates) {
  const collection = getJobsCollection();

  if (!collection) {
    const index = memoryJobs.findIndex((job) => String(job._id) === String(id));

    if (index === -1) {
      return null;
    }

    memoryJobs[index] = {
      ...memoryJobs[index],
      ...updates,
      updatedAt: new Date(),
    };

    return normalizeJob(memoryJobs[index]);
  }

  if (!ObjectId.isValid(id)) {
    return null;
  }

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } }
  );

  const job = await collection.findOne({ _id: new ObjectId(id) });
  return normalizeJob(job);
}

async function deleteJob(id) {
  const collection = getJobsCollection();

  if (!collection) {
    const index = memoryJobs.findIndex((job) => String(job._id) === String(id));

    if (index === -1) {
      return false;
    }

    memoryJobs.splice(index, 1);
    return true;
  }

  if (!ObjectId.isValid(id)) {
    return false;
  }

  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

module.exports = {
  createJob,
  deleteJob,
  findJobById,
  listJobs,
  normalizeJob,
  updateJob,
};
