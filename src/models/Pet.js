const mongoose = require('mongoose');
const User = require('./User');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pet name is required!'],
        mingLenght: [2, 'Pet name should be at least 2 characters'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (value) => /^https?:\/\//.test(value),
            message: 'Photo image URL should start with "http://" or "https://"!'
        }
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        validate: {
            validator: (value) => value > 0 && value < 100,
            message: 'Age is required and should be at least 1 and no longer than 100 characters!'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [5, 'Description should be at least 5 characters!'],
        maxLength: [50, 'Description should be no longer than 50 characters!'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5, 'Location should be at least 5 characters!'],
        maxLength: [50, 'Location should be no longer than 50 characters!'],
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