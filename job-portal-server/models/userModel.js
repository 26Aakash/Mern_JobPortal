const crypto = require("crypto");
const { ObjectId } = require("mongodb");

const { getDatabase } = require("../config/db");

const memoryUsers = [];

function getUsersCollection() {
  const db = getDatabase();
  return db ? db.collection("users") : null;
}

function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    _id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role || "user",
    createdAt: user.createdAt,
  };
}

async function findUserByEmail(email) {
  const collection = getUsersCollection();

  if (!collection) {
    return memoryUsers.find((user) => user.email === email) || null;
  }

  return collection.findOne({ email });
}

async function findUserById(id) {
  const collection = getUsersCollection();

  if (!collection) {
    return memoryUsers.find((user) => String(user._id) === String(id)) || null;
  }

  if (!ObjectId.isValid(id)) {
    return null;
  }

  return collection.findOne({ _id: new ObjectId(id) });
}

async function createUser({ name, email, password, role = "user" }) {
  const collection = getUsersCollection();
  const user = {
    name,
    email,
    password,
    role,
    createdAt: new Date(),
  };

  if (!collection) {
    const storedUser = { ...user, _id: crypto.randomUUID() };
    memoryUsers.push(storedUser);
    return storedUser;
  }

  const result = await collection.insertOne(user);
  return { ...user, _id: result.insertedId };
}

async function updateUserProfile(id, updates) {
  const collection = getUsersCollection();

  if (!collection) {
    const index = memoryUsers.findIndex((user) => String(user._id) === String(id));

    if (index === -1) {
      return null;
    }

    memoryUsers[index] = {
      ...memoryUsers[index],
      ...updates,
    };

    return memoryUsers[index];
  }

  if (!ObjectId.isValid(id)) {
    return null;
  }

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );

  return collection.findOne({ _id: new ObjectId(id) });
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  sanitizeUser,
  updateUserProfile,
};
