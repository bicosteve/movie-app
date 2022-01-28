class UI {
  constructor() {
    this.main = document.getElementById("main");
    this.pagination = document.getElementById("pagination");
    this.movieSet = { moviesPerPage: 4, currentPage: 1, results: null };
    this.imagePath = "https://image.tmdb.org/t/p/w500";
  }

  init(movies) {
    this.movieSet.results = movies;
    this.loadPage(1);
  }

  loadPage = function (page) {
    this.movieSet.currentPage = page;

    this.pagination.innerHTML = "";

    let startMovie =
      (this.movieSet.currentPage - 1) * this.movieSet.moviesPerPage;
    let totalPages = Math.ceil(
      this.movieSet.results.length / this.movieSet.moviesPerPage
    );
    let lastMovie =
      startMovie + this.movieSet.moviesPerPage > this.movieSet.results.length
        ? this.movieSet.results.length
        : startMovie + this.movieSet.moviesPerPage;

    //console.log(startMovie);
    //console.log(lastMovie);
    //console.log(totalPages);
    //console.log(this.movieSet.currentPage);

    let paginationDiv = document.createElement("div");

    //CREATING THE PAGINATION LOGIC
    for (let i = 0; i < totalPages; i++) {
      let span = document.createElement("span");
      span.textContent = i + 1;
      span.classList.add("span_content");

      let self = this;

      //adding event listener on span to change the page
      span.addEventListener("click", function () {
        if (i + 1 !== self.movieSet.currentPage) {
          self.loadPage(i + 1);
        }
      });

      paginationDiv.appendChild(span);

      if (i + 1 === this.movieSet.currentPage) {
        span.classList.add("active_span");
      }
    }

    for (let i = startMovie; i < lastMovie; i++) {
      let div = document.createElement("div");
      const { original_title, overview, poster_path, vote_average, id } =
        this.movieSet.results[i];
      const blurb = overview.length > 130 ? overview.slice(0, 129) : overview;

      div.innerHTML = `
      <div id="${id}" class="movie">
        <img src="${this.imagePath + poster_path}" alt="${original_title}" />
        <div class="movie_info">
          <h3>${original_title}</h3>
          <span class="${this.getClassByRate(
            vote_average
          )}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>${original_title}</h3>
          ${blurb}
          <div class="action_button">
            <button>
              <a id="${id}" onClick="getSingleId(${id})"><i class="fa fa-info-circle fa-2x movie_info" aria-hidden="true"></i></a>
            </button>
            <button>
              <i class="fa fa-shopping-basket fa-2x" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
      `;
      this.main.appendChild(div);
    }

    this.pagination.appendChild(paginationDiv);
  };

  getSingleId(id, movies) {
    return movies.forEach((movie) => {
      if (movie.id === id) {
        console.log(movie);
      }
    });
  }

  showSearchedMovies(movies) {
    //clearing the main of items in the ui
    this.main.innerHTML = "";

    return movies.forEach((movie) => {
      const { overview, id, poster_path, title } = movie;
      this.main.innerHTML += `
        <div id="${id}" class="movie">
        <img src="${this.imagePath + poster_path}" alt="${title}" />
        <div class="movie_info">
          <h3>${title}</h3>
          <span class="green">0</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      </div>
      `;
    });
  }

  getClassByRate(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }
}
