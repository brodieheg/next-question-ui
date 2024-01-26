"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { UseSelector, useSelector } from "react-redux";
export default function Home() {
  const state = useSelector((state) => state.playGame);
  const questions = state.questions;
  console.log(questions);

  return (
    <>
      {questions.map((question) => {
        return (
          <>
            <div>{question.question}</div>
            <div>{question.correct_answer}</div>
            <div>{question.incorrect_answers}</div>
          </>
        );
      })}
    </>
  );
}
