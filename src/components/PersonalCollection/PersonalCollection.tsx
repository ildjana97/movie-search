import React, {  } from 'react';
import './PersonalCollection.css';
import { useSelector } from 'react-redux';
import { selectAllFavoriteMovies } from '../../redux/reducer';

const PersonalCollection: React.FC = () => {
  const favorites = useSelector(selectAllFavoriteMovies);

  return (
    <div className="personal-collection-container">
      <h1 className="personal-collection-header">My Favorite Movies</h1>
      <ul className="favorite-movies-list">
        {favorites.map((movie) => (
          movie ? (
            <li key={movie.imdbID} className="favorite-movie-item">
              <img src={movie.Poster} alt={movie.Title} className="favorite-movie-poster" />
              <p className="favorite-movie-title">{movie.Title}</p>
            </li>
          ) : null
        ))}
      </ul>
    </div>
  );
};

export default PersonalCollection;
