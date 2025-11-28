const userSchema = require("../models/userSchema")
const { emailValid, passValid } = require("../helpers/emailPassValidation")
const jwt = require("jsonwebtoken")

// ==================== register 
const register = async (req, res) => {

    try {
    const { name, email, password, role, skills, bio, resumeUrl, companyName } = req.body

    const errors = {}
    if (!name) errors.nameError = "Name Required"
    if (!email) errors.emailError = "Email Required"
    if (email && !emailValid(email)) errors.emailError = "Email is not Valid"

    // checking if user with email already exists
    if (email && emailValid(email)) {
        const existUser = await userSchema.findOne({ email })
        if (existUser) errors.emailError = "User Already Exists"
    }

    // password validation
    if (!password) errors.passError = "Password Required"
    if (password && passValid(password)) errors.passError = passValid(password)

    // role validation
    if (!role) errors.roleError = "Role Required";
    if (!["employer", "jobSeeker"].includes(role)) errors.roleError = "Invalid role";

    // for employer role
    if (role === "employer" && !companyName) {
        errors.companyError = "Company Name Required";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).send({ errors })
    }

    // for job seekers skills(optional)
    const parsedSkills =
        typeof skills === "string" && skills.trim().length > 0
            ? skills.split(",").map((s) => s.trim())
            : [];

    // save new user 
    const newUser = new userSchema({
        name,
        email,
        password,
        role,
        asEmployerApproved: false,
        companyName: role === "employer" ? companyName : undefined,
        bio: role === "jobSeeker" ? bio : undefined,
        skills: role === "jobSeeker" ? parsedSkills : undefined,
        resumeUrl: role === "jobSeeker" ? resumeUrl : undefined
    })

    await newUser.save()

    return res.status(200).send({ msg: "Registration Successfull!" })
    } catch (error) {
        return res.status(500).send({ err: "Server Problem" })
    }
}

// ==================== login
const login = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email) return res.status(400).send({ err: "Email Required" })
        if (!emailValid(email)) return res.status(400).send({ err: "Email is not Valid" })

        // checking if user with email already exists
        const existUser = await userSchema.findOne({ email })
        if (!existUser) return res.status(400).send({ err: "User is not Exists" })

        if (!password) errors.passError = "Password Required"

        // to check password
        const passCheck = await existUser.isPassValid(password)
        if (password && !passCheck) return res.status(400).send({ err: "Something Went Wrong" })

        if (existUser.isBlocked) return res.status(403).send({ err: "Account is blocked" })

        if (existUser.role === "employer" && !existUser.asEmployerApproved) return res.status(403).send({ err: "Your employer account is pending" })

        // create data set to make changes 
        const loggedUser = existUser.toObject()

        delete loggedUser.password

        // create access token
        const access_token = jwt.sign({
            data: {
                email: existUser.email,
                id: existUser._id,
                role: existUser.role
            }
        }, process.env.SECRET_ACC_TOKEN, { expiresIn: "24h" })

        if (!access_token) return res.status(400).send({ err: "Something Went Wrong" })

        return res
            .status(200)
            .cookie("accessToken", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            })
            .send({ msg: `Welcome ${loggedUser.name}`, loggedUser });
    } catch (error) {
        return res.status(500).send({ err: "Server Error" })
    }
}

const self = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) return res.status(401).send({ err: "No token provided" });

        const decoded = jwt.verify(token, process.env.SECRET_ACC_TOKEN);
        const user = await userSchema.findById(decoded?.data?.id).select("-password");
        if (!user) return res.status(404).send({ err: "User not found" });

        return res.send(user);
    } catch (err) {
        return res.status(401).send({ err: "Invalid token" });
    }
}

module.exports = { register, login, self }