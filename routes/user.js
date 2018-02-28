const express = require('express')
const router = express.Router()
const User = require('../models/user');

router.use((req, res, next) => {
	console.log('Time: ', Date.now())
	next()
})

router.get('/', (req, res) => {

  // create a sample user
  var Josh = new User({
    username:  "longton95",
    firstName: "Josh",
    lastName:   "Longton",
    email:   "longton95@gmail.com",
    password:   "password",
    admin: true
  });

  // save the sample user
  Josh.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});


router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

module.exports = router;