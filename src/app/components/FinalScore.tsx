import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/configureStore";
import { useRouter } from "next/navigation";
import { newGame, addGame } from "../store/slices/slices/userSlice";
import { useEffect } from "react";
const FinalScore = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const score = useSelector((state: RootState) => state.playGame.score);
  const responseCode = useSelector(
    (state: RootState) => state.playGame.responseCode
  );
  const activeQuestion = useSelector(
    (state: RootState) => state.playGame.activeQuestion
  );
  const questions = useSelector((state: RootState) => state.playGame.questions);
  const difficulty = useSelector(
    (state: RootState) => state.newGame.difficulty
  );
  const category = useSelector((state: RootState) => state.newGame.category);
  const type = useSelector((state: RootState) => state.newGame.type);
  const dateCreated = useSelector(
    (state: RootState) => state.newGame.dateCreated
  );
  const user = useSelector((state: RootState) => state.user.id);

  type game = {
    _id?: number;
    user: number;
    dateCreated: string | null | undefined;
    questions: any[];
    difficulty: "easy" | "medium" | "hard" | undefined | null;
    category: number | null | undefined;
    type: string | null | undefined;
    score: number;
  };

  useEffect(() => {
    const gameToSave: game = {
      user,
      dateCreated,
      questions,
      difficulty,
      category,
      type,
      score,
    };
    if (!responseCode && questions.length === activeQuestion - 1) {
      // save game to database
      dispatch(newGame(gameToSave));
      // save game to redux until next database call
    }
  }, [
    dispatch,
    category,
    dateCreated,
    difficulty,
    questions,
    score,
    type,
    user,
    activeQuestion,
    questions.length,
    responseCode,
  ]);
  if (!responseCode && questions.length === activeQuestion - 1) {
    return (
      <div className="final-score">
        <h2 className="mb-4 text-white text-center">Final Score: {score}</h2>
        <button
          className="text-center btn btn-light"
          onClick={() => {
            router.push("/newgame");
          }}
        >
          Play A New Game
        </button>
      </div>
    );
  } else {
    return (
      <h2 className="mt-4 text-white text-center">Current Score: {score}</h2>
    );
  }
};

export default FinalScore;
