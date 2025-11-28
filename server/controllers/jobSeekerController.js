const applicationSchema = require("../models/applicationSchema");
const jobSchema = require("../models/jobSchema");
const userSchema = require("../models/userSchema");

const updateProfile = async (req, res) => {
    try {
        const { bio, skills, resumeURL } = req.body;

        const updated = await userSchema.findByIdAndUpdate(
            req.user.id,
            {
                bio: bio || "",
                skills: skills ? skills.split(",").map(s => s.trim()) : [],
                resumeURL: resumeURL || ""
            },
            { new: true }
        ).select("-password");

        return res.status(200).send(updated);
    } catch (err) {
        return res.status(500).send({ err: "Server Error" });
    }
};

const filterJobs = async (req, res) => {
    try {
        const { location, jobType } = req.query;

        let filter = {};

        if (location) filter.location = location;
        if (jobType) filter.jobType = jobType;

        const jobs = await jobSchema.find(filter).sort({ createdAt: -1 });

        return res.status(200).send(jobs);
    } catch (err) {
        return res.status(500).send({ err: "Server Error" });
    }
};

const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const exists = await applicationSchema.findOne({
            job: jobId,
            applicant: req.user.id
        });

        if (exists) return res.status(400).send({ err: "Already Applied" });

        const newApply = new applicationSchema({
            job: jobId,
            applicant: req.user.id
        });

        return res.status(200).send({ msg: "Applied Successfully", newApply });
    } catch (err) {
        return res.status(500).send({ err: "Server Error" });
    }
};

const appliedJobs = async (req, res) => {
    try {
        const applied = await applicationSchema.find({ applicant: req.user.id })
            .populate("job")
            .sort({ createdAt: -1 });

        return res.status(200).send(applied);
    } catch (err) {
        return res.status(500).send({ err: "Server Error" });
    }
};

module.exports = { updateProfile, filterJobs, applyJob, appliedJobs };
