const express = require('express')
const router = express.Router()

const asda = require('./asda');
const tesco = require('./tesco');
const compare = require('./comparison');
const user = require('./user');
const scraper = require('./scraper');


router.use((req, res, next) => {

    console.log('Check if authorised');
    next();
});

router.get('/', (req, res) => {
    res.json({ message: 'Test API' });
});
router.use('/compare', compare);
router.use('/asda', asda);
router.use('/tesco', tesco);
router.use('/user', user);
// router.use('/scraper', scraper);

module.exports = router;
