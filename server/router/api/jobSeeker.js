const express = require("express");
const { updateProfile, applyJob, appliedJobs } = require("../../controllers/jobSeekerController");
const authMiddleware = require("../../middleware/authMiddleware");
const chekingRoles = require("../../middleware/roleMiddleware");
const jobSeekerRoute = express.Router()

jobSeekerRoute.put(
    "/profile",
    authMiddleware,
    chekingRoles(["jobSeeker"]),
    updateProfile
);

jobSeekerRoute.get(
    "/applied",
    authMiddleware,
    chekingRoles(["jobSeeker"]),
    appliedJobs
);

jobSeekerRoute.post(
    "/jobs/:id/apply",
    authMiddleware,
    chekingRoles(["jobSeeker"]),
    applyJob
);


module.exports = jobSeekerRoute