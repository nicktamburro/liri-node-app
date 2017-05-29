var site = process.argv[2];
var content = process.argv[3];

var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
/*var random = require('./random.txt')*/
var fs = require('fs');
 
var request = require("request");


if (process.argv[2] === "movie-this"){
request("http://www.omdbapi.com/?apikey=40e9cece&t=$" + content + "&y=&plot=short&r=json", function(error, response, body){
    if (!error && response.statusCode === 200) {

        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("Genre: " + JSON.parse(body).Country);
        console.log("Genre: " + JSON.parse(body).Language);
        console.log("Genre: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);

        fs.appendFile('log.txt', JSON.parse(body).Title);
        fs.appendFile('log.txt', JSON.parse(body).Year);
        fs.appendFile('log.txt', JSON.parse(body).imdbRating);
        fs.appendFile('log.txt', JSON.parse(body).Country);
        fs.appendFile('log.txt', JSON.parse(body).Language);
        fs.appendFile('log.txt', JSON.parse(body).Plot);
        fs.appendFile('log.txt', JSON.parse(body).Actors);

        
    } else{
        request("http://www.omdbapi.com/?apikey=40e9cece&t=$mr.+nobody&y=&plot=short&r=json", function(error, response, body){
        if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("Rating: " + JSON.parse(body).imdbRating);
        console.log("Genre: " + JSON.parse(body).Country);
        console.log("Genre: " + JSON.parse(body).Language);
        console.log("Genre: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);

        fs.appendFile('log.txt', JSON.parse(body).Title);
        fs.appendFile('log.txt', JSON.parse(body).Year);
        fs.appendFile('log.txt', JSON.parse(body).imdbRating);
        fs.appendFile('log.txt', JSON.parse(body).Country);
        fs.appendFile('log.txt', JSON.parse(body).Language);
        fs.appendFile('log.txt', JSON.parse(body).Plot);
        fs.appendFile('log.txt', JSON.parse(body).Actors);
        }
        }); 
    }
});

}
 
if (process.argv[2] === "my-tweets"){

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
 
var params = {screen_name: 's0undcast'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
    fs.appendFile('log.txt', tweets);
  }
  else{
      console.log("error");
  }
});

}

if (process.argv[2] === "spotify-this-song"){
    Spotify();
}

function Spotify(){
 
spotify.search({ type: 'track', query: content }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else {
      console.log(data.tracks);
      fs.appendFile('log.txt', data.tracks);
    }

    if (content === ""){
       spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
           console.log(data.tracks);
           fs.appendFile('log.txt', data.tracks);
       });
    }
 
    // Do something with 'data' 
});
}

if (process.argv[2] === "do-what-it-says") {
    fs.readFile('random.txt', 'utf-8', function(err, data) {
        var random = data.split(',');
           console.log(random[0], random[1]);
            spotify.search({ type: 'track', query: random[1] }, function(err, data) {
                if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else {
      console.log(data.tracks);
      fs.appendFile('log.txt', data.tracks);

    }
         });
    });
    }  


