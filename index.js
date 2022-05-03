const moviesJson = require("./movies.json");

class MovieAPI {
  constructor(movies) {
    this.movies = movies;
  }

  fetchAllMovies() {
    return this.movies;
  }
}

const API = new MovieAPI(moviesJson);
const allMovies = API.fetchAllMovies();

// 1 -> Function to add Id's and random rating to the JSON Object
function add_Id_Rating(allMovies) {
  for (var elem in allMovies) {
    allMovies[elem].id = elem;
    allMovies[elem].rating = Math.floor(Math.random() * (6 - 1) + 1); // Using Math.floor(Math.random() * (max - min + 1) + min) where min is Inclusive and max is exclusive
  }
}
add_Id_Rating(allMovies);
// console.log(allMovies);

// 2 -> Function/Method that returns movies from a certain genre
function movie_by_genre(genre) {
  for (var elem in allMovies) {
    if (allMovies[elem].genre == genre) {
      console.log("Movies with " + genre + " genre are :");
      return allMovies[elem].title;
    } else {
      return "No such Movie is found with " + genre + " genre";
    }
  }
}
console.log(movie_by_genre("Comedy")); //Select any of these -> Comedy, Action, Sci-Fi, Adventure, Dramam, Horror, Animated, Romance

// 3 -> Function/Method that removes a movie with a certain id(if found)
function delete_movie(id) {
  for (var elem in allMovies) {
    if (allMovies[elem].id == id) {
      console.log(allMovies[elem].title + " is Deleted");
      delete allMovies[elem]; //delete keywords will delete that particular element from JSON
    }
  }
}
// delete_movie(7); //Enter the ID you want to delete

// 4 -> Function/Method that returns the movies with the subtitle and thumb properties filtered out.
function filter_movie_subtitle(subtitle) {
  const thumbs = []; //creating a new array to store the thumb values
  for (var elem in allMovies) {
    if (allMovies[elem].subtitle == subtitle) {
      thumbs[elem] = allMovies[elem].thumb; //adding values to thumbs[] array
    }
  }
  const newthumbs = thumbs.filter((a) => a); //To remove all the empty element
  return newthumbs;
}

console.log(filter_movie_subtitle("By Garage419")); // Enter the subtitle

// 5 -> Function/Method that returns the movies sorted by name
function sortby_name(title) {
  return function (a, b) {
    //Compare function
    if (a[title] > b[title]) {
      return 1;
    } else if (a[title] < b[title]) {
      return -1;
    }
    return 0;
  };
}
allMovies.sort(sortby_name("title")); //Pass the attribute to be sorted on
for (var item in allMovies) {
  console.log(allMovies[item].title);
}

// 6 -> Function/Method that returns the 2 top rated movies and 2 bottom rates movies.
function top2_bottom2() {
  allMovies.sort(sortby_name("rating")); //using the same sortby function to sort the JSON, based on rating
  console.log("2 bottom rated movies are ");
  for (var item = 0; item < 2; item++) {
    console.log(allMovies[item].title); //gets the top 2 elements from the JSON array
  }
  var length = allMovies.length; //calculate length of JSON array
  console.log("2 top rated movies are ");
  for (var items = length - 1; items > length - 3; items--) {
    console.log(allMovies[items].title); // gets the last 2 elements from the JSON array
  }
}
top2_bottom2(); //the result of top 2 and bottom 2 may change because rating is set randomly

// 7 -> Function/Method that prints out the three top rated movies
function three_topRated(count) {
  allMovies.sort(sortby_name("rating")); //using the same sortby function to sort the JSON based on rating
  console.log("Top 3 rated movies are ");
  var length = allMovies.length; //calculate length of JSON array
  for (var item = length - 1; item >= length - count; item--) {
    console.log(allMovies[item].title);
  }
}
three_topRated(3); //You can calulate Top N rated movies, where N is the Number of Movies you want to display

// 8 -> Function/Method that prints out movies sorted from bottom rated to top rated
function sorted_bottom_top() {
  allMovies.sort(sortby_name("rating")); //using the same sortby function to sort the JSON based on rating
  console.log("Movies sorted based on rating");
  for (var item in allMovies) {
    console.log(allMovies[item].title + " -> Rating " + allMovies[item].rating);
  }
}
sorted_bottom_top(); //the result may change because rating is set randomly

// 9 -> Function/Method that allows the user to add a new movie object to the movie list
function add_movie(description, sources, subtitle, thumb, title, genre) {
  var id = (allMovies.length - 1).toString(); //set value of id to length-1 so whenever an object is created the value of id will be lenght-1
  var rating = Math.floor(Math.random() * (6 - 1) + 1);

  allMovies.push({
    description: description,
    sources: sources,
    subtitle: subtitle,
    thumb: thumb,
    title: title,
    genre: genre,
    id: id,
    rating: rating,
  });
}
add_movie("Test Movie", "test", "test", "test", "test", "test"); //put the data here
console.log(allMovies);

// 10 -> Function/Method that returns a movie with a certain id (if found)
function searchby_Id(id) {
  for (var elem in allMovies) {
    if (allMovies[elem].id == id) {
      return allMovies[elem].title;
    }
  }
  return "Movie with id " + id + " not found"; //condition where id is not found
}
console.log(searchby_Id(90));

// 11 -> Function/Method that changes the title of a movie with a certain id (if found)
function change_title(title, id) {
  //title as an argument
  for (var elem in allMovies) {
    if (allMovies[elem].id == id) {
      allMovies[elem].title = title;
    }
  }
}
var updated_title = "Updated title"; //set new value for title
change_title(updated_title, 12); //pass the same title as a function argument
console.log(allMovies);
