const crypto = require("crypto");
const { ObjectId } = require("mongodb");

const { getDatabase } = require("../config/db");
const { findJobById } = require("./jobModel");

const memoryApplications = [];

function getApplicationsCollection() {
  const db = getDatabase();
  return db ? db.collection("applications") : null;
}

function normalizeApplication(application) {
  if (!application) {
    return null;
  }

  return {
    ...application,
    _id: String(application._id),
    userId: String(application.userId),
    jobId: String(application.jobId),
  };
}

async function createApplication({ userId, jobId }) {
  const collection = getApplicationsCollection();
  const application = {
    userId,
    jobId,
    status: "Applied",
    appliedAt: new Date(),
  };

  if (!collection) {
    const exists = memoryApplications.find(
      (item) =>
        String(item.userId) === String(userId) &&
        String(item.jobId) === String(jobId)
    );

    if (exists) {
      return null;
    }

    const stored = { ...application, _id: crypto.randomUUID() };
    memoryApplications.push(stored);
    return normalizeApplication(stored);
  }

  const existing = await collection.findOne({
    userId: new ObjectId(userId),
    jobId: new ObjectId(jobId),
  });

  if (existing) {
    return null;
  }

  const document = {
    ...application,
    userId: new ObjectId(userId),
    jobId: new ObjectId(jobId),
  };

  const result = await collection.insertOne(document);
  return normalizeApplication({ ...document, _id: result.insertedId });
}

async function listApplicationsByUser(userId) {
  const collection = getApplicationsCollection();

  if (!collection) {
    const items = memoryApplications.filter(
      (item) => String(item.userId) === String(userId)
    );

    const hydrated = await Promise.all(
      items.map(async (item) => ({
        ...normalizeApplication(item),
        job: await findJobById(item.jobId),
      }))
    );

    return hydrated.sort(
      (left, right) =>
        new Date(right.appliedAt).getTime() - new Date(left.appliedAt).getTime()
    );
  }

  const pipeline = [
    { $match: { userId: new ObjectId(userId) } },
    { $sort: { appliedAt: -1 } },
    // Join job details so the frontend can render application cards directly.
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        as: "job",
      },
    },
    { $unwind: "$job" },
  ];

  const results = await collection.aggregate(pipeline).toArray();
  return results.map((item) => ({
    ...normalizeApplication(item),
    job: item.job
      ? {
          ...item.job,
          _id: String(item.job._id),
          createdBy: item.job.createdBy ? String(item.job.createdBy) : null,
        }
      : null,
  }));
}

async function listApplicationsForAdmin() {
  const collection = getApplicationsCollection();

  if (!collection) {
    const hydrated = await Promise.all(
      memoryApplications.map(async (item) => ({
        ...normalizeApplication(item),
        job: await findJobById(item.jobId),
      }))
    );
    return hydrated;
  }

  const pipeline = [
    { $sort: { appliedAt: -1 } },
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        as: "job",
      },
    },
    { $unwind: "$job" },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
  ];

  const results = await collection.aggregate(pipeline).toArray();
  return results.map((item) => ({
    ...normalizeApplication(item),
    job: item.job
      ? {
          ...item.job,
          _id: String(item.job._id),
          createdBy: item.job.createdBy ? String(item.job.createdBy) : null,
        }
      : null,
    user: item.user
      ? {
          _id: String(item.user._id),
          name: item.user.name,
          email: item.user.email,
          role: item.user.role || "user",
        }
      : null,
  }));
}

async function findApplicationById(id, userId) {
  const collection = getApplicationsCollection();

  if (!collection) {
    const application = memoryApplications.find(
      (item) =>
        String(item._id) === String(id) &&
        (!userId || String(item.userId) === String(userId))
    );

    if (!application) {
      return null;
    }

    return {
      ...normalizeApplication(application),
      job: await findJobById(application.jobId),
    };
  }

  if (!ObjectId.isValid(id)) {
    return null;
  }

  const match = { _id: new ObjectId(id) };
  if (userId) {
    match.userId = new ObjectId(userId);
  }

  const pipeline = [
    { $match: match },
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        as: "job",
      },
    },
    { $unwind: "$job" },
  ];

  const [result] = await collection.aggregate(pipeline).toArray();

  if (!result) {
    return null;
  }

  return {
    ...normalizeApplication(result),
    job: result.job
      ? {
          ...result.job,
          _id: String(result.job._id),
          createdBy: result.job.createdBy ? String(result.job.createdBy) : null,
        }
      : null,
  };
}

module.exports = {
  createApplication,
  findApplicationById,
  listApplicationsByUser,
  listApplicationsForAdmin,
};
