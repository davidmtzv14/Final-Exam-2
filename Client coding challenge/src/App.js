import React from "react";
import "./App.css";
import Movie from "./Movie";
import MovieForm from "./MovieForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: "http://localhost:8080/api",
      movies: [],
      errMsg: "",
    };
  }

  getMovies = () => {
    const settings = {
      method: "GET",
      headers: {
        "session-exam-token": "success-token",
      },
    };

    fetch(`${this.state.apiUrl}/movies`, settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((movies) => {
        const errMsg = "";
        this.setState({ movies, errMsg });
      })
      .catch((err) => {
        const errMsg = err.message;
        this.setState({ errMsg });
      });
  };

  addMovie = (event) => {
    event.preventDefault();
    let movie_title = event.currentTarget.movie_title.value;
    let movie_year = event.currentTarget.movie_year.value;
    let movie_rating = event.currentTarget.movie_rating.value;

    let newMovie = {
      movie_title,
      movie_year,
      movie_rating,
    };
    const settings = {
      method: "POST",
      headers: {
        "session-exam-token": "success-token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    };

    fetch(`${this.state.apiUrl}/add-movie`, settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((movie) => {
        const errMsg = "";
        this.setState({ errMsg });
        this.getMovies();
      })
      .catch((err) => {
        const errMsg = err.message;
        this.setState({ errMsg });
      });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <div className="app">
        <div className="form">
          <MovieForm key="form" addMovie={this.addMovie} />
          <p>{this.state.errMsg}</p>
        </div>
        <h1>All Movies</h1>
        <div className="movies">
          {this.state.movies.map((movie) => (
            <div className="movie">
              <Movie className="movie" key={movie.movie_id} movie={movie} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
