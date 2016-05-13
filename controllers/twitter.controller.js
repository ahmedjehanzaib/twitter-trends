var twitterAPI = require('../api/twitter.api');
var twitterController = {};

// Home page
twitterController.index = function(req, res){
    res.render('index');
};

/**
 * Fetch twitter trends for a location
 * @param location : string
 * @param Number of trends : int
 * @response trends
 */
twitterController.getTrends = function(req, res){
    console.log('In get trends Controller!')
    // fetch the req params
    var location = req.params.location;
    var noOfTrends = req.params.no_of_trends;
    // check for the params
    console.log(location);
    if (!location) { return res.render('trends', { error: 'Location was not provided!' }); }
    noOfTrends = noOfTrends || 10;
    // call Twitter API to fetch trends
    var twitterTrends = twitterAPI.getTrends(location,noOfTrends);
    console.log(twitterTrends);
    // return twitter trends if there are
    if(twitterTrends) {
        res.render('trends',{ trendsData:twitterTrends });
    } else {
        res.render('trends',{ trendsData:[] });
    }

};

/**
 * Tweets for a trend
 * @param trend query : string
 * @response tweets
 */
twitterController.getTweets = function(req, res) {
    // fetch params
    var query = req.query.query;
    // check for required params
    if (!query) { return res.status(400).json({ message: 'Missing parameters, query is required' }); }
    // fetch tweets for a trend
    var twitterTweets = twitterAPI.getTweets(query);
    if(twitterTweets) {
        res.status(200).json({ message:'ok', data:twitterTweets });
    } else {
        res.status(404).json({ message:'No tweets for this trend' });
    }
};

module.exports = twitterController;