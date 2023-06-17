const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    const user = await User.findOne({ username: userData.username });

    if (user) {
        throw new Error('Username already exists!');
    }

    return User.create(userData);

}

exports.login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Username or password is not valid!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Username or password is not valid!');
    }

    const payload = {
        "_id": user._id,
        "username": user.username,
        "email": user.email
    }

    const token = await jwt.sign(payload, SECRET);

    return token
};
