const express = require('express')
const router = express.Router()
const rp = require('request-promise');

router.use((req, res, next) => {
	console.log('Time: ', Date.now())
	next()
})

router.get('/', (req, res) => {
	res.json({
		message: 'Test API'
	});
});

router.get('/item/:gtin', (req, res) => {
	var barcode = {
		url: 'https://dev.tescolabs.com/product/?',
		headers: {
			'Ocp-Apim-Subscription-Key': '5b08eb2e2d8c4790a7d3c6f35a13dd6e'
		},
		qs: {
			gtin: req.params.gtin
		}
	};
	var firstMethod = function() {
		var promise = rp(barcode)

		return promise;
	};

	var secondMethod = function(response) {
		var item = JSON.parse(response)
		var product = {
			uri: 'https://dev.tescolabs.com/grocery/products/?',
			headers: {
				'Ocp-Apim-Subscription-Key': '5b08eb2e2d8c4790a7d3c6f35a13dd6e'
			},
			qs: {
				query: item.products[0].brand,
				offset: 0,
				limit: 10,
				tpnb: item.products[0].tpnb

			}
		};
		rp(product)

			.then(function(response) {

				var item = JSON.parse(response)

				res.json({
					Product: item.uk.ghs.products.results
				});
			})
	};

	firstMethod()
		.then(secondMethod)
		.catch(function(err) {
			console.error("Failed to get JSON from tescos API", err);
		})
});

module.exports = router;
