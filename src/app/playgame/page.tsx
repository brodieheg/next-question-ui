"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { UseSelector, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const state = useSelector((state) => state.playGame);
  const questions = state.questions;

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

  // Fix answer choices find to locate the answer and return it
  const handleClick = (e) => {
    const id = e.target.id;
    let answer = { correct: false };
    for (let i = 0; i < answerChoices.length; i++) {
      const question = answerChoices[i];
      let foundAnswer = question.answers.find((answer) => answer.id == id);
      if (foundAnswer) {
        answer = foundAnswer;
      }
      // console.log(answer);
    }
    console.log(answer.correct);
  };

  return (
    <>
      {answerChoices.map((question) => {
        return (
          <>
            <div key={question.question}>{question.question}</div>
            {question.answers.map((answer) => {
              return (
                <div onClick={handleClick} id={answer.id} key={answer.id}>
                  {" "}
                  {answer.answer}{" "}
                </div>
              );
            })}
          </>
        );
      })}
    </>
  );
}
