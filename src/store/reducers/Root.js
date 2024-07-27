import { combineReducers } from 'redux';
import favoritesReducer from './AddToFav';

const rootReducer = combineReducers({
    favorites: favoritesReducer,
});

export default rootReducer;
