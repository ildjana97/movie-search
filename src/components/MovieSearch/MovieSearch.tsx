import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieSearch.css';
import MovieDetailsModal from '../MovieDetailsModal/MovieDetailsModal';
import PersonalCollection from '../PersonalCollection/PersonalCollection';
import FavoriteButton from '../FavoriteButton';


export interface Movie {
  id: string;
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface SelectedMovie {
  Title: string;
  Poster: string;
  Year: string;
  Plot: string;
  Rating: string;
  Genre: string;
  Cast: string;
}


const MovieSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]); // Specify the type as Movie[]
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovie | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page of results
  const [resultsPerPage] = useState(5); // Number of results per page

 const handleSearch = async () => {
    setIsLoading(true);

    try {
      const apiKey = 'a3119379';
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`);
      const { Search } = response.data;

      if (Search) {
        setSearchResults(Search);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

const handleMovieCardClick = async (movie: Movie) => {
    try {
      const apiKey = 'a3119379';
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`);
      const movieData = response.data;

      setSelectedMovie({
        Title: movieData.Title,
        Poster: movieData.Poster,
        Year: movieData.Year,
        Plot: movieData.Plot,
        Rating: movieData.Rating,
        Cast: movieData.Cast,
        Genre: movieData.Genre,
      });

      openModal();
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};

 useEffect(() => {
    handleSearch();
  }, [currentPage]);

  // Function to handle pagination navigation
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [sortOption, setSortOption] = useState('year');

  const sortSearchResults = (option: string) => {
    let sortedResults = [...searchResults];

    if (option === 'year') {
      sortedResults.sort((a, b) => a.Year.localeCompare(b.Year));
    } else if (option === 'rating') {
      
      // Sort by rating in descending order
      // sortedResults.sort((a, b) => b.Rating.localeCompare(a.Rating));
    }

    setSearchResults(sortedResults);
  };
  

  return (
     <div>
     <div className="sort-dropdown-container">
      <select
        className="sort-select"
        value={sortOption}
        onChange={(e) => {
          setSortOption(e.target.value);
          sortSearchResults(e.target.value);
        }}
      >
    <option value="year">Sort by Year</option>
    <option value="rating">Sort by Rating</option>
  </select>
</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '24px'}}>
        <input
          type="text"
          placeholder="Enter a movie title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            fontFamily: 'Girloy-Regular',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px 0 0 5px',
            fontSize: '16px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            fontFamily: 'Girloy-Regular',
            backgroundColor: '#E21919',
            color: '#fff',
            border: 'none',
            borderRadius: '0 5px 5px 0',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Giloy-Regular', fontSize: '24px'}}>{isLoading && <p>Loading...</p>}</div>

      <div className="movie-cards">
       {searchResults
    .slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)
    .map((movie) => (
      <div className="movie-card" key={movie?.imdbID}>
          <img
  src={movie?.Poster}
  alt={movie?.Title}
  onClick={() => {
    handleMovieCardClick(movie);
    openModal();
  }}
/>
          <div className="movie-details">
            <h2>{movie?.Title}</h2>
            <p>Year: {movie?.Year}</p>
        <FavoriteButton movie={movie} />
          </div>
        </div>
      ))}
    </div>
   {isModalOpen && selectedMovie && (
  <MovieDetailsModal movie={selectedMovie} onClose={closeModal} />
)}

<PersonalCollection/>
 {searchResults.length > resultsPerPage && (
  <div className="pagination">
    {Array.from({ length: Math.ceil(searchResults.length / resultsPerPage) }).map((_, index) => {
      const page = index + 1;
      return (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </button>
      );
    })}
  </div>
)}
    </div>
  );
};

export default MovieSearch;

