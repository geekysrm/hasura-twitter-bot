var twit = require('twit');
var CONSUMER_KEY = process.env.CONSUMER_KEY;
var CONSUMER_SECRET = process.env.CONSUMER_SECRET;
var ACCESS_TOKEN = process.env.ACCESS_TOKEN;
var ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
var express = require('express');
var app = express();

var Twitter = new twit({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
});

app.get('/', function (req, res) {
  res.send("Hello World, I am a Twitter bot deployed on Hasura. Go to: https://hasura.io/hub/project/geekysrm/twitter-bot for a detailed tutorial.")
});

//Search parameters below:
const params = { 
  q: '#javascript, #Javascript, #Hasura, #hasura', //write the hashtags you want to listen to
  count: 10,             //no. of tweets to return per page
  result_type: 'recent', //we will go through the most recent tweets first
  lang: 'en'             //we are looking for english tweets only
}

var favorite = function () {
 Twitter.get('search/tweets', params, (err, data, response) => {
    if (err) {
      return console.log(err);
    }
    const tweetsId = data.statuses
      .map(tweet => ({ id: tweet.id_str }));

    tweetsId.map(tweetId => {
      Twitter.post('favorites/create', tweetId, (err, response) => {
        if (err) {
          console.log('Favoriting unsuccessful!');
        }
        else {
        console.log(`Favorited !!`);
        }
      });
    });
  })
}

var retweet = function () {
 
  Twitter.get('search/tweets', params, function (err, data) {
    if (!err) {
      var retweetId = data.statuses[0].id_str;
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function (err, response) {
        if (response) {
          console.log('Retweet successful!');
        }
        if (err) {
          console.log('Some error while retweeting!');
        }
      });
    }
    else {
      console.log('Some error while searching!');
    }
  });
}


var follow = function () {
  Twitter.get('search/tweets', params, function (err, data, response) {
    if (!err) {
      for (var i = 0; i < data.statuses.length; i++) {
        var screen_name = data.statuses[i].user.screen_name;
        if (screen_name != 'HasuraBot') //check that you are not following yourself (Change this your Bot's screen name)
         {  
        Twitter.post('friendships/create', { screen_name }, function (err, response) {
          if (err) {
            console.log(err);
          } else {
            console.log(screen_name, ': FOLLOWED');
          }
        });
      }
      }
    } else {
      console.log(err);
    }
  })
}

retweet();
favorite();
follow();
setInterval(retweet, 60000);      /*Calling these functions every 1 minute*/
setInterval(favorite, 60000);
setInterval(follow, 60000);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

