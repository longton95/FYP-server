const express = require('express')
const router = express.Router()

const asda = require('./asda');
const tesco = require('./tesco');



router.use((req, res, next) => {

    console.log('Check if authorised');
    next();
});

router.get('/', (req, res) => {
    res.json({ message: 'Test API' });
});

router.use('/asda', asda);
router.use('/tesco', tesco);

module.exports = router;
