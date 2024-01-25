// fix for open trivia api

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../rootReducer";
import axios from "axios";

// Async thunks
export const fetchQuestions = createAsyncThunk(
  "/questions",
  async (_, { getState }) => {
    try {
      const queryUrl = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
      console.log(queryUrl);
      const response = await axios.get(queryUrl);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

interface newGameState {
  amount?: number;
  category?: number;
  difficulty?: "easy" | "medium" | "hard";
}

const initialState: newGameState = {
  amount: 10,
  category: 9,
  difficulty: "easy",
};

const newGameSlice = createSlice({
  name: "newGame",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
  },
});

export const { setAmount, setCategory, setDifficulty } = newGameSlice.actions;
export default newGameSlice.reducer;
