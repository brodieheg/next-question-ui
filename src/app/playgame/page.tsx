"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import * as he from "he";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store/configureStore";
import FinalScore from "../components/FinalScore";
import {
  setActiveQuestion,
  setScore,
} from "../store/slices/slices/playGameSlice";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state) => state.playGame);
  const questions = state.questions;
  const activeQuestion = state.activeQuestion;
  const [wrong, setWrong] = React.useState(false);
  const [right, setRight] = React.useState(false);

  React.useEffect(() => {
    dispatch(setScore(0));
    dispatch(setActiveQuestion(1));
  }, [dispatch]);
  const shuffleChoices = (
    correctAnswer: string,
    incorrectAnswers: string[]
  ) => {
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

  const answerChoices = questions.map((question) => {
    const answers = shuffleChoices(
      question.correct_answer,
      question.incorrect_answers
    );
    return {
      question: question.question,
      answers,
    };
  });

  const incrementActiveQuestion = () => {
    dispatch(setActiveQuestion(activeQuestion + 1));
  };
  // Fix answer choices find to locate the answer and return it
  const handleClick = (e) => {
    console.log(activeQuestion);
    setTimeout(incrementActiveQuestion, 1000);
    const id = e.target.id;

    for (let i = 0; i < answerChoices.length; i++) {
      const question = answerChoices[i];
      let foundAnswer = question.answers.find((answer) => answer.id == id);
      if (foundAnswer) {
        const answer = foundAnswer;

        setRight(true);
        console.log("correct");
        setTimeout(() => {
          setRight(false);
          dispatch(setScore(state.score + 1));
        }, 1000);

        setWrong(true);
        setTimeout(() => {
          setWrong(false);
        }, 1000);
      }
    }
  };

  return (
    <>
      {answerChoices.map((question, index) => {
        if (index === activeQuestion - 1) {
          return (
            <div key={uuidv4()}>
              <h4 className="mt-5 text-white text-center">
                Question no: {activeQuestion}
              </h4>
              <div key={uuidv4()}>{he.decode(question.question)}</div>
              {question.answers.map((answer) => {
                if (!answer.correct) {
                  return (
                    <div
                      className={wrong ? "bg-danger" : ""}
                      onClick={handleClick}
                      id={answer.id}
                      key={uuidv4()}
                    >
                      {" "}
                      {he.decode(answer.answer)}{" "}
                    </div>
                  );
                } else
                  return (
                    <div
                      className={right ? "bg-success" : ""}
                      onClick={handleClick}
                      id={answer.id}
                      key={uuidv4()}
                    >
                      {" "}
                      {he.decode(answer.answer)}{" "}
                    </div>
                  );
              })}
            </div>
          );
        }
      })}
      <FinalScore />
    </>
  );
}
