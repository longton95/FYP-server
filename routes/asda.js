const express = require('express')
const router = express.Router()
const rp = require('request-promise');

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', (req, res) => {
    res.json({ message: 'Test API' });
});

router.get('/item/:id', (req, res) => {
	var options = {
      uri: 'https://api-groceries.asda.com/api/items/search?',
      qs: {
        keyword: req.params.id
      }
	};

	rp(options)

		.then(function(response) {

         var item = JSON.parse(response)

			res.json({
				Product: item
			});
		})
		.catch(function(err) {
			console.error("Failed to get JSON from tescos API", err);
		})


});

module.exports = router;
