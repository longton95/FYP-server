const express = require('express')
const app = express();
const router = express.Router()

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

app.set('secret', config.secret);


router.use((req, res, next) => {
	console.log('Time: ', Date.now())
	next()
})

router.post('/', (req, res) => {
   User.findOne({
     username: req.body.username
   }, function(err, user) {
      console.log(req.body);

     if (err) throw err;

     if (!user) {
       res.json({ success: false, message: 'Authentication failed. User not found.' });
     } else if (user) {

       if (user.password != req.body.password) {
         res.json({ success: false, message: 'Authentication failed. Wrong password.' });
       } else {

     const payload = {
       admin: user.admin
     };

         var token = jwt.sign(payload, app.get('secret'), { expiresIn: '30d' });

         res.json({
           success: true,
           token: token
         });
       }

     }

   });
});

module.exports = router;