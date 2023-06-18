const router = require('express').Router();

const userManager = require('../managers/userManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/register', (req, res) => res.render('users/register'));

router.post('/register', async (req, res) => {
    const { username, email, password, repassword } = req.body;

    try {
        const token = await userManager.register({ username, email, password, repassword });

        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        res.render('users/register', { error: getErrorMessage(err), username, email });
    }



});

router.get('/login', (req, res) => res.render('users/login'));

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userManager.login(username, password);

        res.cookie('token', token);

        res.redirect('/')
    } catch (err) {
        res.render('users/login', { error: getErrorMessage(err) })
    }



});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


router.get('/profile', (req, res) => res.render('users/profile'));

module.exports = router;