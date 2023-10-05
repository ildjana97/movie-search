import { useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie, selectAllFavoriteMovies } from "../redux/reducer";

const FavoriteButton = ({ movie }: any) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectAllFavoriteMovies);

  const isFavorite = favorites.some((favMovie) => favMovie.imdbID === movie.imdbID);

  const handleToggleFavorite = () => {
    console.log('Clicked on movie:', movie); // Add this line for debugging
    if (isFavorite) {
      dispatch(removeMovie(movie.imdbID));
    } else {
      dispatch(addMovie(movie));
    }
  };

  return (
    <button onClick={handleToggleFavorite}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton