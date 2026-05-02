const express = require("express");

const {
  createJobPosting,
  getJobById,
  getJobs,
  removeJobPosting,
  updateJobPosting,
} = require("../controllers/jobController");
const { authorizeRoles, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", authorizeRoles("admin"), createJobPosting);
router.put("/:id", authorizeRoles("admin"), updateJobPosting);
router.delete("/:id", authorizeRoles("admin"), removeJobPosting);

module.exports = router;
