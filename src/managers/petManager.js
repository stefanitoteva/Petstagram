const Pet = require('../models/Pet');

exports.getAll = () => Pet.find().populate('owner');

exports.create = (petData) => Pet.create(petData);

exports.getOne = (petId) => Pet.findById(petId).populate('owner');

exports.update = (petId, petData) => Pet.findByIdAndUpdate(petId, petData);

exports.delete = (petId) => Pet.findByIdAndDelete(petId);