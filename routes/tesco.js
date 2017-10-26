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
	var results = {};
	var barcode = {
		url: 'https://dev.tescolabs.com/product/?',
		headers: {
			'Ocp-Apim-Subscription-Key': '5b08eb2e2d8c4790a7d3c6f35a13dd6e'
		},
		qs: {
			gtin: req.params.gtin
		},
		json: true
	};
	rp(barcode)
		.then(function(itemSearch) {
			results.itemSearch = itemSearch;
		}).then(function() {

			var product = {
				uri: 'https://dev.tescolabs.com/grocery/products/?',
				headers: {
					'Ocp-Apim-Subscription-Key': '5b08eb2e2d8c4790a7d3c6f35a13dd6e'
				},
				qs: {
					query: results.itemSearch.products[0].brand,
					offset: 0,
					limit: 10,
					tpnb: results.itemSearch.products[0].tpnb
				},
				json: true
			};

			return rp(product);
		}).then(function(itemPrice) {
			res.status(200);

			results.itemPrice = itemPrice;

			if (results.itemPrice.uk.ghs.products.totals.all != 0) {

				res.json({
					Product: results.itemPrice.uk.ghs.products.results
				});

			} else {

				res.status(206);
				res.json({
					Product: results.itemSearch.products[0]
				});

			}

		}).catch(function(err) {
			res.status(404).send("Not found. 2");
		});

});

module.exports = router;
