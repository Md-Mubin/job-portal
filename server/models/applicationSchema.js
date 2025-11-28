const mongoose = require("mongoose");
const { Schema } = mongoose;

const applicationSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: "jobs",
        required: true
    },

    applicant: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    skills: {
        type: String
    },

    resumeUrl: {
        type: String
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("applications", applicationSchema);
