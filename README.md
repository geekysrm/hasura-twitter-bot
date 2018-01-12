# Building a Twitter Bot on Hasura

In this tutorial, we will create a **Twitter Bot** deployed on Hasura, which will do the following 3 tasks for a particular keyword which appears in someone's tweet:

* Favorite the tweet
* Retweet the tweet
* Follow the user who tweeted about that keyword

## Pre-requisites for the tutorial

* [NodeJS](https://nodejs.org)

* [hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)

* A new [Twitter](https://twitter.com) account for the bot (Also verify mobile no. for this account)

## Getting the bot running

### Create a twitter application

* Login to your new Twitter account you made for the bot.
* Navugate to https://apps.twitter.com/app/new
* Fill out the required fields. You can leave the callback URL blank. Also fill out any valid website in your website section.
* Click on `Create your Twitter Application`.

![Twitter app screen](https://raw.githubusercontent.com/geekysrm/hasura-twitter-bot/master/assets/twitter-1.png "twitter app screen")

* Go to the `Keys and Access Tokens` section and keep a note of the four tokens/key shown i.e. Consumer Key, Consumer Secret, Access Token, Access Token Secret. 
You may have to create access token and access token secret for the first time if it was not shown.

![Twitter app screen2](https://raw.githubusercontent.com/geekysrm/hasura-twitter-bot/master/assets/twitter-2.png "twitter app screen2")

In this project, we are using the [twit](https://www.npmjs.com/package/twit) NPM package for fectching tweets and for favoriting, retweeting and following.

### Getting the Hasura project

```sh
$ hasura quickstart geekysrm/twitter-bot
$ cd twitter-bot
# Add CONSUMER_KEY to secrets.
$ hasura secrets update bot.twitter_consumer_key.key <YOUR-CONSUMER-KEY>
# Add CONSUMER_SECRET to secrets
$ hasura secrets update bot.twitter_consumer_secret.key <YOUR-CONSUMER-SECRET>
# Add ACCESS_TOKEN to secrets
$ hasura secrets update bot.twitter_access_token.key <YOUR-ACCESS-TOKEN>
# Add ACCESS_TOKEN_SECRET to secrets
$ hasura secrets update bot.twitter_access_token_secret.key <ACCESS-TOKEN-SECRET>
# Deploy
$ git add . && git commit -m "Deployment commit"
$ git push hasura master
```

After the `git push` completes, run:

```sh
$ hasura microservice list
```

You will get an output like so:

```sh
INFO Getting microservices...                     
INFO Custom microservices:                        
NAME   STATUS    INTERNAL-URL(tcp,http)   EXTERNAL-URL
bot    Running   bot.default              http://bot.apology69.hasura-app.io

INFO Hasura microservices:                        
NAME            STATUS    INTERNAL-URL(tcp,http)   EXTERNAL-URL
auth            Running   auth.hasura              http://auth.apology69.hasura-app.io
data            Running   data.hasura              http://data.apology69.hasura-app.io
filestore       Running   filestore.hasura         http://filestore.apology69.hasura-app.io
gateway         Running   gateway.hasura           
le-agent        Running   le-agent.hasura          
notify          Running   notify.hasura            http://notify.apology69.hasura-app.io
platform-sync   Running   platform-sync.hasura     
postgres        Running   postgres.hasura          
session-redis   Running   session-redis.hasura     
sshd            Running   sshd.hasura              
vahana          Running   vahana.hasura
```

Check that the service named `bot` is up and running.

That's it! You have created your very first Twitter bot.

Now, your bot will check for recent tweets containing the keyword **'#Hasura'**.
_(You can change the keyword you want to look for in the `telegram-bot/microservices/bot/src/server.js` file.)_
And your bot will **favorite** and **retweet** those recent tweets about that keyword; and also will **follow** the user who tweeted abut that.

## Bot in Action

## Support

If you happen to get stuck anywhere, feel free to raise an issue [here](https://github.com/jaisontj/hasura-fb-bot)
