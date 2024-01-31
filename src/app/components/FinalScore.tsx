import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const FinalScore = () => {
  const router = useRouter();
  const score = useSelector((state) => state.playGame.score);
  const activeQuestion = useSelector((state) => state.playGame.activeQuestion);
  const questions = useSelector((state) => state.playGame.questions);
  if (questions.length === activeQuestion - 1) {
    return (
      <>
        <h2 className="text-white text-center">Final Score: {score}</h2>
        <button
          className="col-2 offset-5 text-center btn btn-light"
          onClick={() => {
            router.push("/newgame");
          }}
        >
          Play A New Game
        </button>
      </>
    );
  } else {
    return <h2 className="text-white text-center">Current Score: {score}</h2>;
  }
};

export default FinalScore;
