// https://jbohde.github.io/liri-node-app/

require("dotenv").config();
// Load the keys from the keys.js file
var keys = require("./keys.js");
// Load the fs package to read and write
var fs = require("fs");

// Take two arguments.
// The first will be the action (i.e. "my-tweets", "spotify-this-song", etc.)
// The second will be the value that will be passed into the corresponding function;
var action = process.argv[2];
var value = process.argv.slice(3).toString();

// Created a switch-case statement (if-then would also work).
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

// Store something from the command line
const textFile = `log.txt`;

// Removing all the commas from the string
var stringValue = value.replace(/[, ]+/g, " ").trim();

// Capitalizing the first letter in each word
function toUpper(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
}

// ******* SPOTIFY ******* //
function spotifyThis() {
  var Spotify = require("node-spotify-api");
  var spotify = new Spotify(keys.spotify);
  // Setting the value if none is placed
  if (value.length === 0) {
    value = `Ace of Base The Sign`;
    stringValue = value;
  }
  spotify.search({ type: "track", query: value }, function (err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    for (var i = 0; i < 1; i++) {
      // Parsing and arranging the requested data in a reader friendly form, and then logging to log.txt file
      var artist =
        `The artist is ` + data.tracks.items[i].album.artists[0].name + `\r\n`;
      var track =
        `The name of the track is ` + data.tracks.items[i].name + `\r\n`;
      var album =
        `The track appears on the album ` +
        data.tracks.items[i].album.name +
        `\r\n`;
      var preview =
        `Preview the song: ` +
        data.tracks.items[i].preview_url +
        `\r\n` +
        `\r\n`;
      console.log(artist + track + album + preview);
      fs.appendFile(
        textFile,
        action +
        `, ` +
        toUpper(stringValue) +
        `\r\n` +
        artist +
        track +
        album +
        preview,
        function (err) {
          console.log(err || "Content logged!");
        }
      );
    }
  });
}

// ******* TWITTER ******* //
function myTweets() {
  var Twitter = require("twitter");
  var client = new Twitter(keys.twitter);
  var params = { screen_name: value.toString() };
  // for my dummy twitter the value should be: joshua_bohde
  client.get("statuses/user_timeline", params, function (
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        if (i > 20) return;
        // Parsing and arranging the requested data in a reader friendly form, and then logging to log.txt file
        console.log(
          `On ` +
          tweets[i].created_at +
          `, ` +
          tweets[i].user.name +
          ` tweeted ` +
          `"` +
          tweets[i].text +
          `"` +
          "\n"
        );
        fs.appendFile(
          textFile,
          action +
          `, ` +
          stringValue +
          `\r\n` +
          `On ` +
          tweets[i].created_at +
          `, ` +
          tweets[i].user.name +
          ` tweeted ` +
          `"` +
          tweets[i].text +
          `"` +
          `\r\n` +
          `\r\n`,
          function (err) {
            console.log(err || "Content logged!");
          }
        );
      }
    }
  });
}

//  ******* OMDB ******* //
function movieThis() {
  const request = require("request");
  if (value.length === 0) {
    value = `Mr. Nobody`;
    stringValue = value;
  }
  // Run a request to the OMDB API with the movie specified
  request(
    `http://www.omdbapi.com/?t=${value}&y=&plot=short&apikey=trilogy`,
    function (e, r, b) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!e && r.statusCode === 200) {
        // Parsing the body of the site and displaying just the required data
        var movieTitle = `${JSON.parse(b).Title}`;
        var movieName = `The name of the movie is ` + movieTitle + `\r\n`;
        var yearReleased =
          movieTitle + ` was released ${JSON.parse(b).Released}` + `\r\n`;
        var imdbScore =
          movieTitle +
          ` has an IMDB rating of ${JSON.parse(b).imdbRating}` +
          `\r\n`;
        // var rottenScore = movieTitle + ` has a Rotten Tomatoes rating of ${JSON.parse(b).Ratings[1].Value}` + `\r\n`;
        var produced =
          movieTitle + ` was produced in ${JSON.parse(b).Country}` + `\r\n`;
        var language =
          movieTitle + ` is in the ${JSON.parse(b).Language} language` + `\r\n`;
        var plot =
          `The plot of ` +
          movieTitle +
          ` is as follows: ${JSON.parse(b).Plot}` +
          `\r\n`;
        var actors =
          movieTitle +
          ` stars the actors ${JSON.parse(b).Actors}` +
          `\r\n` +
          `\r\n`;
        console.log(
          movieName +
          yearReleased +
          imdbScore +
          produced +
          language +
          plot +
          actors
        );
        fs.appendFile(
          textFile,
          action +
          `, ` +
          toUpper(stringValue) +
          `\r\n` +
          movieName +
          yearReleased +
          imdbScore +
          produced +
          language +
          plot +
          actors,
          function (err) {
            console.log(err || "Content logged!");
          }
        );
      }
    }
  );
}

// //  ******* DO-WHAT-IT-SAYS ******* //
function doIt() {
  // Running the readFile module that's inside of fs.
  // Stores the read information into the variable "data"
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // Break the string down by comma separation and store the contents into the output array.
    var output = data.split(",");
    // Loop Through the newly created output array
    for (var i = 0; i < 1; i++) {
      // Print each element (item) of the array/
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
