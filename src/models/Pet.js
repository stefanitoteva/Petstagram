const mongoose = require('mongoose');
const User = require('./User');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pet name is required!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required!']
    },
    age: {
        type: Number,
        required: [true, 'Age is required!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    },
    location: {
        type: String,
        required: [true, 'Location is required!']
    },
    commentList: [{
        userID: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        comment: String,
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;