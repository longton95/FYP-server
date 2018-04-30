const express = require('express')
const router = express.Router()
const app = express();
const jwt = require('jsonwebtoken');

const config = require('../config');
const asda = require('./asda');
const tesco = require('./tesco');
const compare = require('./comparison');
const user = require('./user');

app.set('secret', config.secret);

router.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, app.get('secret'), function(err, decoded) {
      if (err) {
         res.status(403);
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
         res.status(200);
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

router.get('/', (req, res) => {
    res.json({ message: 'Test API' });
});
router.use('/compare', compare);
router.use('/asda', asda);
router.use('/tesco', tesco);
router.use('/user', user);

module.exports = router;
