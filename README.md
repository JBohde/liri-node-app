# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Requirements

  * Node.js Visit <https://nodejs.org/en/>
  * Your own set of corresponding API keys for Twitter, Spotify, and OMDB

   Get your Twitter API keys by following these steps:

   * Step One: Visit <https://apps.twitter.com/app/new>
   
   * Step Two: Fill out the form with dummy data. Type `http://google.com` in the Website input. Don't fill out the Callback URL input. Then submit the form.
   
   * Step Three: On the next screen, click the Keys and Access Tokens tab to get your consume key and secret. 
   
   * Step Four: At the bottom of the page, click the `Create my access token` button to get your access token key and secret.

   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
   * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api). 
     
   Get your OMDB API key by following these steps:

   * Step One: Visit <http://www.omdbapi.com/apikey.aspx>

   * Step Two: Sign up for the free account type (or become a Patreon!) and enter a valid email address.

   * Step Three: Retrieve your API key from your email

### What Each Command Should Do

1. `node liri.js my-tweets '<user name here>'`

   * This will show the last 20 tweets of the user input and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.
   
3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It will run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     

* In addition to logging the data to the terminal/bash window, the data is also output to a .txt file called `log.txt`.