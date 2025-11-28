const applicationSchema = require("../models/applicationSchema");
const jobSchema = require("../models/jobSchema");

const createJob = async (req, res) => {
    try {
        const { title, company, location, jobType, salaryRange, description } = req.body;

        const job = new jobSchema({
            title,
            company,
            location,
            jobType,
            salaryRange,
            description,
            employer: req.user.id
        });

        await job.save();

        return res.status(200).send({ msg: "Job Created", job });
    } catch (error) {
        return res.status(500).send({ err: "Server Error" });
    }
};

const editJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await jobSchema.findOne({ _id: jobId, employer: req.user.id });
        if (!job) return res.status(400).send({ err: "Job Not Found" });

        Object.assign(job, req.body);
        await job.save();

        return res.status(200).send({ msg: "Job Updated", job });
    } catch (error) {
        return res.status(500).send({ err: "Server Error" });
    }
};

const viewApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const applicants = await applicationSchema
            .find({ job: jobId })
            .populate("jobSeeker", "name email skills resumeUrl");

        return res.status(200).send({ applicants });
    } catch (error) {
        return res.status(500).send({ err: "Server Error" });
    }
};

module.exports = { createJob, editJob, viewApplicants };
