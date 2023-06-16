const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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