const express = require("express");
const { createJob, editJob, viewApplicants } = require("../../controllers/employerController");
const authMiddleware = require("../../middleware/authMiddleware");
const chekingRoles = require("../../middleware/roleMiddleware");
const employerRoute = express.Router()

employerRoute.post(
    "/",
    authMiddleware,
    chekingRoles(["employer"]),
    createJob
);

employerRoute.put(
    "/:id",
    authMiddleware,
    chekingRoles(["employer"]),
    editJob
);

employerRoute.get(
    "/:id/applicants",
    authMiddleware,
    chekingRoles(["employer"]),
    viewApplicants
);

module.exports = employerRoute