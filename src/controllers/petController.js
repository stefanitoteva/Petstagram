const router = require('express').Router();
const petManager = require('../managers/petManager');
const { getErrorMessage } = require('../utils/errorHelpers');

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

    try {
        await petManager.create({
            name,
            age,
            description,
            location,
            imageUrl,
            owner: req.user._id
        })

        res.redirect('/pets/catalog');

    } catch (err) {
        res.render('pets/create', { error: getErrorMessage(err) });
    }

});

router.get('/:petId/details', async (req, res) => {
    const pet = await petManager.getOne(req.params.petId).lean();

    if (!pet) {
        res.redirect('/404');
    }

    isOwner = pet.owner._id?.toString() === req.user?._id;

    res.render('pets/details', { pet, isOwner });
});

router.get('/:petId/edit', async (req, res) => {
    const pet = await petManager.getOne(req.params.petId).lean();

    if (!pet) {
        res.redirect('/404');
    }

    res.render('pets/edit', { pet })
});

router.post('/:petId/edit', async(req, res) => {
    const petData = req.body;
    const petId = req.params.petId;

    await petManager.update(petId, petData);

    res.redirect(`/pets/${petId}/details`);
})




module.exports = router;