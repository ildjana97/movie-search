import { configureStore } from '@reduxjs/toolkit';
import favoriteMoviesReducer, { FavoriteMoviesState } from './reducer';
import { loadState, saveState } from '../localStorage';

const persistedState = loadState(); 

export type RootState = {
  favoriteMovies: FavoriteMoviesState;
};

export const store = configureStore({
  reducer: {
    favoriteMovies: favoriteMoviesReducer,
  },
  preloadedState: persistedState,
});

// Subscribe to changes in the Redux store and save the state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});