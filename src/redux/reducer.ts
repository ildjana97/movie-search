import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Movie } from '../components/MovieSearch/MovieSearch';

const selectMovieId = (movie: Movie) => movie.imdbID;

export interface FavoriteMoviesState  extends EntityState<Movie> {}



const favoriteMoviesAdapter = createEntityAdapter<Movie>({
  selectId: selectMovieId,
});

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState: favoriteMoviesAdapter.getInitialState(),
  reducers: {
    addMovie: favoriteMoviesAdapter.addOne,
    removeMovie: favoriteMoviesAdapter.removeOne,
  },
});

export const {
  selectAll: selectAllFavoriteMovies,
  selectById: selectFavoriteMovieById,
} = favoriteMoviesAdapter.getSelectors((state: { favoriteMovies: FavoriteMoviesState }) => state.favoriteMovies);

export const { addMovie, removeMovie } = favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;
