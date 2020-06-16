import React from 'react';

function Movie( props ){
    return(
        <div>
            <h2>Title: {props.movie.movie_title}</h2>
            <p>id: {props.movie.movie_id}</p>
            <p>year: {props.movie.movie_year}</p>
            <p>rating: {props.movie.movie_rating}</p>
        </div>
    );
}

export default Movie;