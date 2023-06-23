import { combineReducers, configureStore } from '@reduxjs/toolkit';
import imageReducer from './imagestore/ImageSlice';
import { nasaApi } from './Nasa/nasaApi';
import countReducer from './reducers/CountSlice';
import { usersApi } from './usersApi';

const rootReducer = combineReducers({
  countReducer,
  imageReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [nasaApi.reducerPath]: nasaApi.reducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(usersApi.middleware)
    .concat(nasaApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
