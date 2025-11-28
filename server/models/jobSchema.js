const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Remote"],
        required: true
    },

    salaryRange: {
        type: String
    },

    description: {
        type: String
    },

    employer: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("jobs", jobSchema);
