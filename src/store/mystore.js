import { createStore } from 'redux';
import favoritesReducer from './reducers/AddToFav';

const store = createStore(favoritesReducer);

export default store;