// fix for open trivia api

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../rootReducer";

interface questionState {
  question: string;
  answers: [];
}

interface playGameState {
  questions: questionState[];
  activeQuestion: number;
  score: number;
  responseCode: number | null;
}

const initialState: playGameState = {
  questions: [
    {
      question: "",
      answers: [],
    },
  ],
  activeQuestion: 0,
  score: 0,
  responseCode: null,
};

const playGameSlice = createSlice({
  name: "playGame",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setActiveQuestion: (state, action) => {
      state.activeQuestion = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setResponseCode: (state, action) => {
      state.responseCode = action.payload;
    },
  },
});

export const { setQuestions, setActiveQuestion, setResponseCode, setScore } =
  playGameSlice.actions;
export default playGameSlice.reducer;
