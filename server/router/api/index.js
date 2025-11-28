const express = require("express")
const authRoute = require("./auth")
const jobsRoute = require("./jobs")
const adminRoute = require("./admin")
const employerRoute = require("./employer")
const jobSeekerRoute = require("./jobSeeker")
const apiRoute = express.Router()

apiRoute.use("/auth", authRoute)
apiRoute.use("/jobs", jobsRoute)
apiRoute.use("/admin", adminRoute)
apiRoute.use("/employer", employerRoute)
apiRoute.use("/jobSeeker", jobSeekerRoute)

module.exports = apiRoute