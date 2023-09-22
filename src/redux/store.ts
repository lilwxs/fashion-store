import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './services/userApi';
import { persistReducer } from 'redux-persist';
import storage from './customStorage';
import { authReducer } from './slices/authSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['isAuth', 'jid'],
};

const rootReducer = combineReducers({
  // auth: persistReducer(authPersistConfig, authReducer),
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([userApi.middleware]),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
