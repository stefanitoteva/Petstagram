const router = require('express').Router();
const petManager = require('../managers/petManager');

router.get('/catalog', async (req, res) => {
    const pets = await petManager.getAll().lean();
    res.render('pets/catalog', { pets })

});

router.get('/add-photo', (req, res) => res.render('pets/create'));

router.post('/add-photo', async (req, res) => {
    const {
        name,
        age,
        description,
        location,
        imageUrl,
    } = req.body;

    await petManager.create({
        name,
        age,
        description,
        location,
        imageUrl,
        owner: req.user._id
    })

    res.redirect('/pets/catalog');
});




module.exports = router;