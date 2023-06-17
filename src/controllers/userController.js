const router = require('express').Router();

const userManager = require('../managers/userManager');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
    const { username, email, password, repassword } = req.body;

    try {
        await userManager.register({ username, email, password, repassword });

        res.redirect('/');
    } catch (err) {
        res.render('register', { error: getErrorMessage(err) });
    }



});

router.get('/login', (req, res) => res.render('login'));

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userManager.login(username, password);

        res.cookie('token', token);

        res.redirect('/')
    } catch (err) {
        res.render('login', { error: getErrorMessage(err) })
    }



});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;