import { configureStore } from "@reduxjs/toolkit";
import newGameReducer from "./slices/slices/newGameSlice";
// ...

const store = configureStore({
  reducer: {
    newGame: newGameReducer,
    // playGame: playGameReducer,
    // users: usersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
