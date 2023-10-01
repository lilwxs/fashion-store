import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsApi } from './services/productsAPI';
import { cartReducer } from './slices/cartSlice';
import { sideMenuReducer } from './slices/sideMenuSlice';
import storage from './customStorage';
// import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const cartPersistConfig = {
  key: 'cart',
  storage: storage,
  // whitelist: ['cart'],
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  sideMenu: sideMenuReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([productsApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
