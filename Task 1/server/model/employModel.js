const mongoose = require('mongoose');

const EmpylomentSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        joiningDate: {
            type: String,
            required: true,
        },
        lastDate: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('empyloments', EmpylomentSchema);