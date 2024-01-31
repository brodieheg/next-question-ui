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
  activeQuestion: any;
  score: number;
  activeQuestionIndex: number;
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
  activeQuestion: 0,
  score: 0,
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
    setActiveQuestionIndex: (state, action) => {
      state.activeQuestionIndex = action.payload;
    },
  },
});

export const {
  setQuestions,
  setActiveQuestion,
  setScore,
  setActiveQuestionIndex,
} = playGameSlice.actions;
export default playGameSlice.reducer;
