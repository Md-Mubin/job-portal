const mongoose = require("mongoose");
const { Schema } = mongoose;

const employerProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true
    },

    companyName: {
        type: String
    },

    asEmployerApproved: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("employerProfiles", employerProfileSchema);
