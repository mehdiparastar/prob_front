import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/rtkApi/apiSlice';

const nodeENV = process.env.NODE_ENV

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiSlice.middleware]),
  devTools: nodeENV !== 'production' ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
