import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menuSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

// Export the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Export the AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;