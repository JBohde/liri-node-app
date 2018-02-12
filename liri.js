// require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

 `my-tweets`

 `spotify-this-song`

 `movie-this`

 `do-what-it-says`


//  * [Twitter](https://www.npmjs.com/package/twitter)
   
//  * [Spotify](https://www.npmjs.com/package/node-spotify-api)
 
//  * [Request](https://www.npmjs.com/package/request)

//  * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

//  * [DotEnv](https://www.npmjs.com/package/dotenv)



var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


 // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
const request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
const title = 'Tangled';


// Then run a request to the OMDB API with the movie specified
request(`http://www.omdbapi.com/?t=${title}&y=&plot=short&apikey=trilogy`, function(e, r, b) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!e && r.statusCode === 200) {

    // Parse the body of the site and display just the imdbRating property
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log(`The movie ${JSON.parse(b)}`);
    console.log(`The movie ${title} has a rating of ${JSON.parse(b).imdbRating}`);
  }
});