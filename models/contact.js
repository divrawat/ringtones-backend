var mongoose = require("mongoose");

var ContactSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            index: true,
            required: true,
            trim: true,
        },
        subject: {
            type: String,
            trim: true,
            required: true,
            index: true,
        },
        message: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } },
    { versionKey: false }
);


module.exports = mongoose.model('Contact', ContactSchema);