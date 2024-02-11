import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const newGame = createAsyncThunk(
  "newgame",
  async (gameBody: {}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/newgame`, gameBody);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface user {
  id: number;
  email: string;
  games: [];
  allTimeScore: number;
  totalQuestionsAttempted: number;
}

const initialState: user = {
  id: 0,
  email: "",
  games: [],
  allTimeScore: 0,
  totalQuestionsAttempted: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeId: (state, action) => {
      state.id = action.payload;
    },
    storeEmail: (state, action) => {
      state.email = action.payload;
    },
    addGame: (
      state: any,
      action: PayloadAction<{
        _id?: number;
        user: number;
        dateCreated: string | null | undefined;
        questions: any[];
        difficulty: "easy" | "medium" | "hard" | undefined | null;
        category: number | null | undefined;
        type: string | null | undefined;
        score: number;
      }>
    ) => {
      if (
        !state.games.find(
          (game: { _id: number }) => game._id === action.payload._id
        )
      )
        state.games.push(action.payload);
    },
    setAllTimeScore: (state, action) => {
      state.allTimeScore = action.payload;
    },
    setTotalQuestionsAttempted: (state, action) => {
      state.totalQuestionsAttempted = action.payload;
    },
  },
});

export const {
  storeId,
  storeEmail,
  addGame,
  setAllTimeScore,
  setTotalQuestionsAttempted,
} = userSlice.actions;

export default userSlice.reducer;
