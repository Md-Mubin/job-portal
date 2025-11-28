const express = require("express")
const { allJob, selectedJob } = require("../../controllers/jobsController")
const jobsRoute = express.Router()

jobsRoute.get("/", allJob)
jobsRoute.get("/:id", selectedJob)

module.exports = jobsRoute