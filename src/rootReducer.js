import {combineReducers} from '@reduxjs/toolkit';
import navigationReducer from './features/navigationSlice.js';
import colorReducer from './features/colorsSlice.js';
import goodsReducer from './features/goodsSlice.js';
import productReducer from './features/productSlice.js';
import favoritesReducer from './features/favoritesSlice.js';
import cartReducer from './features/cartSlice.js';
import searchReducer from './features/searchSlice.js';
import statusServerReducer from './features/statusServerSlice.js';

export const rootReducer = combineReducers({
  navigation: navigationReducer,
  color: colorReducer,
  goods: goodsReducer,
  product: productReducer,
  favorites: favoritesReducer,
  cart: cartReducer,
  search: searchReducer,
  statusServer: statusServerReducer,
});
