const Pet = require('../models/Pet');

exports.getAll = () => Pet.find().populate('owner');

exports.create = (petData) => Pet.create(petData);