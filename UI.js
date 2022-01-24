class UI {
  constructor() {
    this.main = document.getElementById("main");
    this.pagination = document.getElementById("pagination");
    this.movieSet = { moviesPerPage: 4, currentPage: 1, results: null };
    this.imagePath = "https://image.tmdb.org/t/p/w500";
    //this.infoButton = document.querySelector(".movie_info");
  }

  init(movies) {
    this.movieSet.results = movies;
    this.loadPage(1);
  }

  loadPage = function (page) {
    this.movieSet.currentPage = page;

    this.pagination.innerHTML = "";

    let startMovie = (this.movieSet.currentPage - 1) * this.movieSet.moviesPerPage;
    let totalPages = Math.ceil(this.movieSet.results.length / this.movieSet.moviesPerPage);
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
        //self.loadPage(i + 1);
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
          <span class="${this.getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>${original_title}</h3>
          ${blurb}
          <div class="action_button">
            <button>
              <a id="${id}" href="single.html/${id}"><i class="fa fa-info-circle fa-2x movie_info" aria-hidden="true"></i></a>
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

  showHomeMovies(movies) {
    this.main.innerHTML = "";

    movies.forEach((movie) => {
      const { original_title, overview } = movie;
      this.main.innerHTML += `
        <div class="movie">
        <img src="#" alt="#" />
        <div class="movie_info">
          <h3>${original_title}</h3>
          <span class="${this.getClassByRate(5)}">rating</span>
        </div>
        <div class="overview">
          <h3>${original_title}</h3>
          ${overview}
          <div class="action_button">
            <button>
              <i class="fa fa-thumbs-up fa-2x" aria-hidden="true"></i>
            </button>
            <button>
              <i class="fa fa-shopping-basket fa-2x" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    });
  }

  showSearchMovies(movies) {
    //clearing the main of items in the ui
    this.main.innerHTML = "";

    return movies.forEach((movie) => {
      const { description, id, image, title } = movie;
      this.main.innerHTML += `
        <div class="movie">
        <img src="${image}" alt="${title}" />
        <div class="movie_info">
          <h3>${title}</h3>
          <span class="green">0</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${description}
          <div class="action_button">
            <button>
              <i class="fa fa-thumbs-up fa-2x" aria-hidden="true"></i>
            </button>
            <button>
              <i class="fa fa-shopping-basket fa-2x" aria-hidden="true"></i>
            </button>
          </div>
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