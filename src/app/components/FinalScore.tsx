import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const FinalScore = () => {
  const router = useRouter();
  const score = useSelector((state) => state.playGame.score);
  const responseCode = useSelector((state) => state.playGame.responseCode);
  const activeQuestion = useSelector((state) => state.playGame.activeQuestion);
  const questions = useSelector((state) => state.playGame.questions);
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
