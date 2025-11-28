const express = require("express");
const { pendingEmployers, approveEmployer, rejectEmployer, allApplications, toggleBlockUser } = require("../../controllers/adminControllers");
const authMiddleware = require("../../middleware/authMiddleware");
const chekingRoles = require("../../middleware/roleMiddleware");
const adminRoute = express.Router()

adminRoute.get(
    "/employers/pending",
    authMiddleware,
    chekingRoles(["admin"]),
    pendingEmployers
);

adminRoute.put(
    "/employers/:id/approve",
    authMiddleware,
    chekingRoles(["admin"]),
    approveEmployer
);

adminRoute.put(
    "/employers/:id/reject",
    authMiddleware,
    chekingRoles(["admin"]),
    rejectEmployer
);

adminRoute.get(
    "/applications",
    authMiddleware,
    chekingRoles(["admin"]),
    allApplications
);

adminRoute.put(
    "/users/:id/toggle-block",
    authMiddleware,
    chekingRoles(["admin"]),
    toggleBlockUser
);

module.exports = adminRoute