const Pet = require('../models/Pet');

exports.create = (petData) => Pet.create(petData);