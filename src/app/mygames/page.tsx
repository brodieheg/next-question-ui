"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/configureStore";
import { useRouter } from "next/navigation";
import {
  setQuestions,
  setResponseCode,
} from "../store/slices/slices/playGameSlice";

import { setDate } from "../store/slices/slices/newGameSlice";

import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);
  const playGame = useSelector((state: RootState) => state.playGame);
  const games = state.games;

  const responseCode = useSelector(
    (state: RootState) => state.playGame.responseCode
  );
  const activeQuestion = useSelector(
    (state: RootState) => state.playGame.activeQuestion
  );
  const questions = useSelector((state: RootState) => state.playGame.questions);

  useEffect(() => {
    dispatch(setQuestions([]));
    dispatch(setResponseCode(null));
    dispatch(setDate(null));
  }, []);

  if (games.length > 0) {
    return (
      <>
        <div className="mt-5 row text-center">
          <h3 className="text-white col-md-4 offset-4">
            Click a game to play it again
          </h3>
          <p className="text-white col-md-4 offset-4">
            Your original score will not be affected, but your results will
            contribute to your all-time score percentage
          </p>
          {games.map((game: any) => {
            if (game.dateCreated) {
              return (
                <button
                  className="col-md-4 my-2 offset-4 game-button rounded bg-white text-black"
                  key={uuidv4()}
                  type="button"
                  onClick={() => {
                    dispatch(setQuestions(game.questions));
                    dispatch(setResponseCode(0));
                    router.push("/playgame");
                  }}
                >
                  {game.dateCreated}
                  <br></br>
                  Questions {game.questions.length}
                  <br></br>
                  Your Score: {game.score}
                </button>
              );
            } else
              return (
                <button
                  className="col-md-4 my-2 offset-4 game-button rounded bg-white text-black"
                  key={uuidv4()}
                  type="button"
                  onClick={() => {
                    dispatch(setQuestions(game.questions));
                    dispatch(setResponseCode(null));
                    router.push("/playgame");
                  }}
                >
                  {game.dateCreated}
                  <br></br>
                  Questions {game.questions.length}
                  <br></br>
                  Your Score: {game.score}
                </button>
              );
          })}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="mt-5 row text-center">
        <h3 className="text-white col-md-4 offset-4">No games yet!</h3>
        <button
          className="mt-1 col-2 offset-5 text-center btn btn-light"
          onClick={() => router.push("/newgame")}
        >
          Create Your First Game!
        </button>
      </div>
    </>
  );
}
