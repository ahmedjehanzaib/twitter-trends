var trends = require('../dummy_responses/trends.json');
var tweets = require('../dummy_responses/tweets.json');
var twitterApi = {};

/**
 * This wrapper will call twitter API and fetch tweets and trends
 *
 * [TODO]: Connect to actual twitter API in future
 */

// fetch trends from the dummy response
twitterApi.getTrends = function(place,n){
    if(trends[place]){
        var trendsArray = trends[place][0].trends;
        // sorting trends on the basis of tweets volume
        // and then selecting first 'n' trends
        return trendsArray.sort(function(a, b){return b.tweet_volume - a.tweet_volume}).slice(0,n);
    }else{
        return false;
    }
};
// fetch tweets from the dummy response
twitterApi.getTweets = function(query){
    if(tweets[query]){
        return tweets[query];
    }else{
        return false;
    }

};

module.exports = twitterApi;