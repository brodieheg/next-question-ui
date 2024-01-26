// fix for open trivia api

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../rootReducer";

interface questionState {
  type: "boolean" | "multiple";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface playGameState {
  questions: questionState[];
}

const initialState: playGameState = {
  questions: [
    {
      type: "boolean",
      difficulty: "easy",
      category: "General Knowledge",
      question: "",
      correct_answer: "",
      incorrect_answers: [""],
    },
  ],
};

const playGameSlice = createSlice({
  name: "playGame",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { setQuestions } = playGameSlice.actions;
export default playGameSlice.reducer;
