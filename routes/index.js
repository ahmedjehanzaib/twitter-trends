var express = require('express');
var twitterController = require('../controllers/twitter.controller');
var router = express.Router();

/* GET home page. */
router.get('/', twitterController.index);
// Get trends on the basis of location
router.get('/trends/place/:location/:no_of_trends', twitterController.getTrends);
// Get tweets for a trend
router.get('/tweets', twitterController.getTweets);

module.exports = router;
