const express = require("express");

const {
  applyForJob,
  getAdminApplications,
  getUserApplicationById,
  getUserApplications,
} = require("../controllers/applicationController");
const { authorizeRoles, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/apply/:jobId", applyForJob);
router.get("/user", getUserApplications);
router.get("/user/:id", getUserApplicationById);
router.get("/admin", authorizeRoles("admin"), getAdminApplications);

module.exports = router;
