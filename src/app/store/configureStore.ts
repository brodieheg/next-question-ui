import { configureStore } from "@reduxjs/toolkit";
import newGameReducer from "./slices/slices/newGameSlice";
import playGameReducer from "./slices/slices/playGameSlice";
import authReducer from "./slices/slices/authSlice";
import userReducer from "./slices/slices/userSlice";

const store = configureStore({
  reducer: {
    newGame: newGameReducer,
    playGame: playGameReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
