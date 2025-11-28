const applicationSchema = require("../models/applicationSchema");
const userSchema = require("../models/userSchema");

const pendingEmployers = async (req, res) => {
    try {
        const data = await userSchema.find({ role: "employer", asEmployerApproved: false });
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send({ err: "Server Error" });
    }
};

const approveEmployer = async (req, res) => {
    try {
        const { id } = req.params;
        await userSchema.findByIdAndUpdate(id, { asEmployerApproved: true });
        return res.status(200).send({ msg: "Approved" });
    } catch (err) {
        return res.status(500).send({ err: "Server Error" });
    }
};

const rejectEmployer = async (req, res) => {
    try {
        const { id } = req.params;
        await userSchema.findByIdAndDelete(id);
        return res.status(200).send({ msg: "Rejected & Deleted" });
    } catch (err) {
        return res.status(500).send({ err: "Server Error" });
    }
};

const allApplications = async (req, res) => {
    try {
        const apps = await applicationSchema.find()
            .populate("job", "title company")
            .populate("user", "name email");
        return res.status(200).send(apps);
    } catch (err) {
        return res.status(500).send({ err: "Server Error" });
    }
};

const toggleBlockUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userSchema.findById(id);
        if (!user) return res.status(400).send({ err: "User Not Found" });

        user.isBlocked = !user.isBlocked;
        await user.save();

        return res.status(200).send({ msg: user.isBlocked ? "Blocked" : "Unblocked" });
    } catch (err) {
        return res.status(500).send({ err: "Server Error" });
    }
};

module.exports = { pendingEmployers, approveEmployer, rejectEmployer, allApplications, toggleBlockUser };
