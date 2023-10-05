// components/MovieDetailsModal.tsx
import React from 'react';
import './MovieDetailsModal.css'

// Inside your MovieSearch.tsx or a separate file if needed
interface SelectedMovie {
  Title: string;
  Poster: string;
  Year: string;
  Plot: string;
  Rating: string;
  Cast: string;
  // Add other relevant movie data properties here
}

interface MovieDetailsModalProps {
  movie: SelectedMovie | null; // Pass the selected movie data
  onClose: () => void; // Callback to close the modal
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {movie ? (
          <div className="movie-details-container">
            <div className="movie-poster">
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="movie-details">
              <h2>{movie.Title}</h2>
              <p>Year: {movie.Year}</p>
              <p>Plot: {movie.Plot}</p>
              <p>Rating: {movie.Rating}</p>
              <p>Cast: {movie.Cast}</p>
              {/* Add other movie details here */}
            </div>
          </div>
        ) : (
          <div>No movie details available.</div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal;
