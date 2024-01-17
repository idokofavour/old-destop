const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
        required: [true, 'Please add a text field']
    },
    plan: {
        type: String
    },
    tag: {
        type: String
    },
    event: {
        type: String
    },
});

module.exports = mongoose.model('List', ListSchema)