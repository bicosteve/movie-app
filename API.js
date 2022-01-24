class Home {
  constructor() {
    //theMovieDB settings
    this.api_KEY = api_KEY;
  }

  async getPopularMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${this.api_KEY}&page=1`
    );
    const data = await response.json();
    return data;
  }

  async searchMovie(movie) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `${this.SEARCH_URL}/${this.api_key}/${movie}`,
      requestOptions
    );
    const data = await response.json();
    return data;
  }

  async getOneMovie(movieID) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.api_KEY}&language=en-US`
    );
    const data = await response.json();
    //console.log(data);
    return data;
  }
}
