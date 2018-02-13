require("dotenv").config();
var keys = require("./keys.js");

// Load the fs package to read and write
var fs = require("fs");

// Take two arguments.
// The first will be the action (i.e. "my-tweets", "spotify-this-song", etc.)
// The second will be the item that will be passed into the corresponding function;
var action = process.argv[2];
var value = process.argv.slice(3);

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotifyThis();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doIt();
    break;
}
 
// ******* SPOTIFY ******* //
function spotifyThis() {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: value}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for (var i = 0; i < 5; i++) {
      // console.log(data.tracks);  
      // console.log(data.tracks.items[0].album);
      console.log(`The artist is ` + data.tracks.items[i].album.artists[0].name);
      console.log(`The name of the track is ` + data.tracks.items[i].name);
      console.log(`The track appears on the album ` + data.tracks.items[i].album.name);
      console.log(`Preview the song: ` + data.tracks.items[i].preview_url);
    }
  });
}


// ******* TWITTER ******* //
function myTweets() {
  var Twitter = require('twitter');
  var client = new Twitter(keys.twitter);
  var params = {screen_name: value};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].created_at);
      console.log(tweets[i].text);
    }
  }
  });
}

//  ******* OMDB ******* //
function movieThis() {
  const request = require('request');

  // Run a request to the OMDB API with the movie specified
  request(`http://www.omdbapi.com/?t=${value}&y=&plot=short&apikey=trilogy`, function(e, r, b) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!e && r.statusCode === 200) {

      // Parsing the body of the site and displaying just the required data
      // console.log(b);
      var movieTitle = `${JSON.parse(b).Title}`;
      console.log(`The name of the movie is ` + movieTitle);
      console.log(movieTitle + ` was released ${JSON.parse(b).Released}`);
      console.log(movieTitle + ` has an IMDB rating of ${JSON.parse(b).imdbRating}`);
      console.log(movieTitle + ` has a ${JSON.parse(b).Ratings[1].Source} rating of ${JSON.parse(b).Ratings[1].Value}`);
      console.log(movieTitle + ` was produced in ${JSON.parse(b).Country}`);
      console.log(movieTitle + ` is in the ${JSON.parse(b).Language} language`);
      console.log(`The plot of ` + movieTitle + ` is as follows: ${JSON.parse(b).Plot}`);
      console.log(movieTitle + ` stars the actors ${JSON.parse(b).Actors}`);
    }
  });
}

// //  ******* DO-WHAT-IT-SAYS ******* //
function doIt() {
  // Includes the FS package for reading and writing packages
  var fs = require("fs");

  // Running the readFile module that's inside of fs.
  // Stores the read information into the variable "data"
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    // Break the string down by comma separation and store the contents into the output array.
    var output = data.split(",");
    // Loop Through the newly created output array
    for (var i = 0; i < 1; i++) {
      // Print each element (item) of the array/
      // console.log(output[i]);
      action = output[0];
      value = output[1];

      switch (action) {
        case "my-tweets":
          myTweets();
          break;
      
        case "spotify-this-song":
          spotifyThis();
          break;
      
        case "movie-this":
          movieThis();
          break;
      
        case "do-what-it-says":
          doIt();
          break;
      }
    }
  });
}

// const fs = require('fs');

// // Store something from the command line
// const textFile = process.argv[2];

// // use fs.appendFile to write "Hello Kitty" into a file
// // If the file didn't exist then it gets created
// fs.appendFile(textFile, 'Hello Kitty ', function(err) {

//   // If an error was experienced...
//   if (err) {
//     console.log(err);
//   }
//   // otherwise...
//   else {
//     console.log('Content Added!');
//   }

//   // OR, more conventionally...

//   console.log(err || 'Content Added!');

// });
