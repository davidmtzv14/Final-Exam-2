import React from 'react';

function MovieForm( props ){
    return(
        <div>
            <h1>New Movie</h1>
            <form onSubmit={props.addMovie}>
                <div>
                    <label htmlFor="movie_title">Title</label>
                    <input id="movie_title" name="movie_title" type="text"></input>
                </div>
                <div>
                    <label htmlFor="movie_year">Year</label>
                    <input id="movie_year" name="movie_year" type="number"></input>
                </div>
                <div>
                    <label htmlFor="movie_rating">Rating</label>
                    <input id="movie_rating" name="movie_rating" type="number"></input>
                </div>
                <button type="submit">Create Movie</button>
            </form>
        </div>
    );
}

export default MovieForm;