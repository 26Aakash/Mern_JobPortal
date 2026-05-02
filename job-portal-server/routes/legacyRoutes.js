const express = require("express");

const { login, register } = require("../controllers/authController");
const { getUserApplications } = require("../controllers/applicationController");
const {
  createJobPosting,
  getJobById,
  getJobs,
  removeJobPosting,
  updateJobPosting,
} = require("../controllers/jobController");
const { authorizeRoles, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/all-jobs", protect, getJobs);
router.get("/all-jobs/:id", protect, getJobById);
router.get("/myJobs/:email", protect, getUserApplications);
router.post("/post-job", protect, authorizeRoles("admin"), createJobPosting);
router.patch("/update-job/:id", protect, authorizeRoles("admin"), updateJobPosting);
router.delete("/job/:id", protect, authorizeRoles("admin"), removeJobPosting);

module.exports = router;
