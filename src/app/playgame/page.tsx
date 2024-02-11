"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import * as he from "he";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/configureStore";
import FinalScore from "../components/FinalScore";
import {
  setActiveQuestion,
  setScore,
} from "../store/slices/slices/playGameSlice";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.playGame);
  const questions = state.questions;
  const activeQuestion = state.activeQuestion;
  const [wrong, setWrong] = React.useState(false);
  const [right, setRight] = React.useState(false);

  React.useEffect(() => {
    dispatch(setScore(0));
    dispatch(setActiveQuestion(1));
  }, [dispatch]);

  const incrementActiveQuestion = () => {
    dispatch(setActiveQuestion(activeQuestion + 1));
  };
  // Fix answer choices find to locate the answer and return it
  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    setTimeout(incrementActiveQuestion, 1000);
    const id = e.target.id;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      let foundAnswer = question.answers.find((answer) => answer.id == id);
      if (foundAnswer) {
        const answer = foundAnswer;
        if (answer.correct) {
          setRight(true);
          setWrong(true);

          setTimeout(() => {
            setRight(false);
            setWrong(false);
            dispatch(setScore(state.score + 1));
          }, 1000);
        } else {
          setWrong(true);
          setRight(true);
          setTimeout(() => {
            setWrong(false);
            setRight(false);
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="row text-center">
      {questions.map((question, index) => {
        if (index === activeQuestion - 1) {
          return (
            <div
              className="container w-75 justify-content-center"
              key={uuidv4()}
            >
              <h5 className="mt-5 text-white col-md-4 offset-4 text-center">
                Question no: {activeQuestion}
              </h5>
              <h4
                className="mt-3 text-white col-md-4 offset-4 text-center"
                key={uuidv4()}
              >
                {he.decode(question.question)}
              </h4>
              {question.answers.map((answer) => {
                if (!answer.correct) {
                  return (
                    <button
                      className={
                        wrong
                          ? "mt-4 mx-2 bg-danger border-0 col-md-4 offset-4 btn btn-primary"
                          : "mt-4 mx-2 border-0 offset-4 col-md-4 text-center btn btn-primary"
                      }
                      onClick={handleClick}
                      id={answer.id}
                      key={uuidv4()}
                    >
                      {" "}
                      {he.decode(answer.answer)}{" "}
                    </button>
                  );
                } else
                  return (
                    <button
                      className={
                        right
                          ? "mt-4 mx-2 border-0 col-md-4 offset-4 btn btn-primary bg-success"
                          : "mt-4 mx-2 border-0 col-md-4 offset-4 btn btn-primary"
                      }
                      onClick={handleClick}
                      id={answer.id}
                      key={uuidv4()}
                    >
                      {" "}
                      {he.decode(answer.answer)}{" "}
                    </button>
                  );
              })}
            </div>
          );
        }
      })}
      <FinalScore />
    </div>
  );
}
