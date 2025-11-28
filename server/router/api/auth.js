const express = require("express")
const { register, login, self } = require("../../controllers/authControllers")
const authRoute = express.Router()
const authMiddleware = require("../../middleware/authMiddleware")
const chekingRoles = require("../../middleware/roleMiddleware")

authRoute.post("/register", register)
authRoute.post("/login", login)
authRoute.get(
    "/self",
    authMiddleware,
    chekingRoles(["admin", "employer", "jobSeeker"]),
    self
)

module.exports = authRoute