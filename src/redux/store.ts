import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import { userApi } from './services/userApi';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import cart from './slices/cartSlice';
import sideMenu from './slices/sideMenuSlice';
import storage from './customStorage';

const reducers = combineReducers({
  cart,
  sideMenu,
  // [userApi.reducerPath]: userApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([thunk]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
