const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    keywords: [{
        name: {
            type: String,
            required: true
        }
    }],
    bidAmount: {
        type: Number,
        required: true
    },
    fund: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    town: {
        type: String
    },
    radius: {
        type: Number,
        required: true
    },
    _projectId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = Campaign = mongoose.model('campaign', CampaignSchema);