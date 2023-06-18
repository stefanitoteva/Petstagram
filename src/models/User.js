const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required!'],
        minLength: [2, 'Username should be minimum 2 characters!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email should be minimum 10 characters!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Password should be minimum 4 characters!']
    },
});

userSchema.virtual('repassword')
    .set(function(value) {
        if(this.password !== value) {
            throw new Error ('Passwords don\'t match!');
        }
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
})


const User = mongoose.model('User', userSchema);

module.exports = User;