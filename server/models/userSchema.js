const mongoose = require("mongoose")
const { Schema } = mongoose
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["admin", "employer", "jobSeeker"],
        required: true,
    },

    // for job seekers
    bio: {
        type: String
    },

    skills: {
        type: [String],
        default: []
    },

    resumeUrl: {
        type: String
    },


    // for employers
    companyName: {
        type: String
    },

    companyWebsite: {
        type: String
    },

    asEmployerApproved: {
        type: Boolean,
        default: false
    },

    // for admin control
    isBlocked: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

// creating hash password and save it in schema
userSchema.pre("save", async function () {
    this.password = bcrypt.hashSync(this.password, 10);
});

// check if the req password = saved hash password in the database
userSchema.methods.isPassValid = async function (userPass) {
    return await bcrypt.compare(userPass, this.password);
};

module.exports = mongoose.model("users", userSchema);