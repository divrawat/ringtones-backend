var mongoose = require("mongoose");

var songSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            index: true,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            trim: true,
            required: true,
            index: true,
            unique: true,
        },
        duration: {
            type: String,
            trim: true,
        },
        Categories: {
            type: String,
            trim: true,
            index: true,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = mongoose.model('Ringtone', songSchema);
