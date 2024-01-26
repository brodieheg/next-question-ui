// fix for open trivia api

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../rootReducer";
import axios from "axios";

// Async thunks
export const fetchQuestions = createAsyncThunk(
  "/questions",
  async (_, { getState }) => {
    try {
      const queryUrl = `https://opentdb.com/api.php?`;
      const state = getState();
      const params = {
        amount: state.newGame.amount,
        category: state.newGame.category,
        difficulty: state.newGame.difficulty,
        type: state.newGame.type,
      };
      const response = await axios.get(queryUrl, { params });
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "/questions",
  async (_, { getState }) => {
    try {
      const queryUrl = `https://opentdb.com/api_category.php`;
      const response = await axios.get(queryUrl);
      return response.data;
    } catch (err) {
      console.log(err);
      return [{ error: err }];
    }
  }
);

interface newGameState {
  categories: object[];
  amount?: number;
  category?: number;
  difficulty?: "easy" | "medium" | "hard";
  type?: "multiple" | "boolean";
}

const initialState: newGameState = {
  categories: [{ hello: "world" }],
  amount: 10,
  category: 9,
  difficulty: "easy",
  type: "multiple",
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
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setType, setAmount, setCategory, setDifficulty, setCategories } =
  newGameSlice.actions;
export default newGameSlice.reducer;
