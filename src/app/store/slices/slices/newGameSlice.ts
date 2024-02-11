// fix for open trivia api
import { v4 as uuidv4 } from "uuid";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../rootReducer";
import axios from "axios";

const shuffleChoices = (correctAnswer: string, incorrectAnswers: string[]) => {
  const correctAnswerMarked = {
    answer: correctAnswer,
    correct: true,
    id: uuidv4(),
  };
  const incorrectAnswersMarked = incorrectAnswers.map((answer) => {
    return { answer, correct: false, id: uuidv4() };
  });
  const combinedArray: object[] = incorrectAnswersMarked.toSpliced(
    0,
    0,
    correctAnswerMarked
  );
  let currentIndex = combinedArray.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [combinedArray[currentIndex], combinedArray[randomIndex]] = [
      combinedArray[randomIndex],
      combinedArray[currentIndex],
    ];
  }
  return combinedArray;
};

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: [];
}

const answerChoices = (questions: Question[]) => {
  const newQuestions = questions.map((question) => {
    const answers = shuffleChoices(
      question.correct_answer,
      question.incorrect_answers
    );
    return {
      question: question.question,
      answers,
    };
  });
  return newQuestions;
};

// Async thunks
export const fetchQuestions = createAsyncThunk(
  "/questions",
  async (_, { getState }) => {
    try {
      const queryUrl = `https://opentdb.com/api.php?`;
      const state: RootState = getState();
      const params = {
        amount: state.newGame.amount,
        category: state.newGame.category,
        difficulty: state.newGame.difficulty,
        type: state.newGame.type,
      };
      const response = await axios.get(queryUrl, { params });
      const newResponse = {
        response_code: response.data.response_code,
        results: answerChoices(response.data.results),
      };
      return newResponse;
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
  amount?: number | null;
  category?: number | null;
  difficulty?: "easy" | "medium" | "hard" | null;
  type?: "multiple" | "boolean" | null;
  dateCreated?: string | null;
}

const initialState: newGameState = {
  categories: [{ hello: "world" }],
  amount: 10,
  category: null,
  difficulty: null,
  type: null,
  dateCreated: null,
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
    setDate: (state, action) => {
      state.dateCreated = action.payload;
    },
  },
});

export const {
  setType,
  setAmount,
  setCategory,
  setDifficulty,
  setDate,
  setCategories,
} = newGameSlice.actions;
export default newGameSlice.reducer;
