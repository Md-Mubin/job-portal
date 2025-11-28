const jobSchema = require("../models/jobSchema")

const allJob = async (req, res) => {
    try {
        const jobs = await jobSchema.find().sort({ createdAt: -1 })
        return res.status(200).send(jobs)
    } catch (err) {
        return res.status(500).send({ err: "Server Error" })
    }
}

const selectedJob = async (req, res) => {
    try {
        const { id } = req.params
        const job = await jobSchema.findById(id)

        if (!job) return res.status(404).send({ err: "Job not found" })

        return res.status(200).send(job)
    } catch (err) {
        return res.status(500).send({ err: "Server Error" })
    }
}

module.exports = { allJob, selectedJob }
