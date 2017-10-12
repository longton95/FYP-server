const express = require('express')
const router = express.Router()
const request = require('request');
const asda = require('./asda');


router.use((req, res, next) => {

    console.log('Check if authorised');
    next();
});

router.get('/', (req, res) => {
    res.json({ message: 'Test API' });
});

router.use('/asda', asda);

module.exports = router;
