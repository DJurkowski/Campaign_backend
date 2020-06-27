const mongoose = require('mongoose');

const EmeraldSchema = new mongoose.Schema({
    funds: {
        type: Number,
        required: true
    },
    _projectId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = Emerald = mongoose.model('emerald', EmeraldSchema);