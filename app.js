const searchForm = document.getElementById("search_form");
const searchTerm = document.getElementById("search");
const pagination = document.getElementById("pagination");
const main = document.getElementById("main");

const home = new Home();
const ui = new UI();

home
  .getPopularMovies()
  .then((data) => {
    ui.init(data.results);
  })
  .catch((error) => console.log(error));

//search for movies
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (searchTerm.value && searchTerm !== "") {
    home
      .searchMovie(searchTerm.value)
      .then((data) => {
        if (data.results.length > 0) {
          ui.showSearchedMovies(data.results);
        } else {
          console.log("Error occured");
        }
      })
      .catch((error) => console.log(error));

    searchTerm.value = "";
  } else {
    window.location.reload();
  }
});

//SINGLE MOVIE
main.addEventListener("click", (event) => {
  if (event.target.classList.contains("movie_info")) {
    //console.log(event.target.parentNode.id);
    const movieID = parseInt(event.target.parentNode.id);
    //window.location.assign(`single.html/${movieID}`);
    home.getOneMovie(movieID);
  }
});

//ui.getSingleMovie();
//home.getOneMovie(ui.getSingleMovie);

//single movie
//pagination
