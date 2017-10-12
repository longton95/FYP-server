const express = require('express')
const router = express.Router()
const request = require('request');

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
router.get('/item',(req, res) => {
  request({
    uri: 'https://api-groceries.asda.com/api/items/search?',
    qs: {
      // api_key: '123456',
      keyword: 'apple'
    }
  }).pipe(res);
});

module.exports = router;
