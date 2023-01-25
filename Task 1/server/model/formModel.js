const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        aadharcard: {
            type: Number,
            required: true,
        },
        aadharcardfile: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('forms', UserSchema);