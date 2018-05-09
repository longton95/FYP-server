const express = require('express');

const router = express.Router()
const User = require('../models/user');

router.use((req, res, next) => {
	console.log('Time: ', Date.now())
	next()
})

router.get('/', (req, res) => {

	// create a sample user
	var Josh = new User({
		username: "longton95",
		firstName: "Josh",
		lastName: "Longton",
		email: "longton95@gmail.com",
		password: "password",
		admin: true
	});

	// save the sample user
	Josh.save(function(err) {
		if (err) throw err;

		res.json({
			success: true
		});
	});
});

router.post('/create', (req, res) => {
	console.log(req.body);

	if (!req.body.email || !req.body.password) {
		return res.status(400).send({ error: 'no data sent' })
	}
	User.find({
		email: req.body.email
	}, function(err, user) {
		if (user.length) {
			return res.status(409).send({ error: 'Email Exits' })
		} else {

			var user = new User({
				username: req.body.username,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
				admin: false
			});

			user.save(function(err) {
				if (err) throw err;
				res.json({
					success: true,
					message: "User saved successfully"
				});
			});
		}
	});
});


router.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

module.exports = router;