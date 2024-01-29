import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import usersStoreReducer from './UsersStore/UsersStoreSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {combineReducers} from 'redux';

const usersStorePersistConfig = {
  key: 'usersStore',
  version: 1,
  storage: AsyncStorage,
};
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};
// Combine individual reducers into one rootReducer
const reducer = combineReducers({
  usersStore: persistReducer(usersStorePersistConfig, usersStoreReducer),
});

// Create a root-level persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure the Redux store with the persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export types for better TypeScript support
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
