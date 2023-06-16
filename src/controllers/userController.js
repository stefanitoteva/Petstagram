const router = require('express').Router();

const userManager = require('../managers/userManager');

router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
    const { username, email, password, repassword } = req.body;

    await userManager.register({ username, email, password, repassword });

    res.redirect('/');

});

router.get('/login', (req, res) => res.render('login'));

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const token = await userManager.login(username, password);

    res.cookie('token', token);

    res.redirect('/')

});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;