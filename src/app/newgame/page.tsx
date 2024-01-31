"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "../store/configureStore";
import NoResultsError from "../components/NoResultsError";

import {
  fetchQuestions,
  setType,
  fetchCategories,
  setCategories,
  setAmount,
  setCategory,
  setDifficulty,
} from "../store/slices/slices/newGameSlice";
import { setQuestions } from "../store/slices/slices/playGameSlice";

export default function Home() {
  const [responseCode, setResponseCode] = useState(0);
  const router = useRouter();
  const state: RootState = useSelector((state) => state.newGame);
  const playGameState: RootState = useSelector((state) => state.playGame);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const resultsCall = async () => {
      console.log("call");
      const results = await dispatch(fetchCategories());
      dispatch(setCategories(results.payload.trivia_categories));
    };
    resultsCall();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const questions = await dispatch(fetchQuestions());
    console.log(questions);
    setResponseCode(questions.payload.response_code);
    if (!questions.payload.response_code) {
      dispatch(setQuestions(questions.payload.results));
      router.push("/playgame");
    } else {
      console.log("no results");
      return false;
    }
  };

  return (
    <>
      <h1 className="col-md-4 pt-2 pb-2 offset-4 text-white text-center mt-5">
        Set Up A New Game
      </h1>
      <form
        className=" mt-3 blue form-group text-white"
        onSubmit={handleSubmit}
      >
        <div className="row mb-4 mt-5 ">
          <label className="col-md-2 offset-4" htmlFor="questionNumber">
            How Many Questions?
          </label>
          <input
            className="col-md-2 input px-2"
            onChange={(e) => {
              dispatch(setAmount(e.target.value));
            }}
            name="questionNumber"
            type="number"
            max="50"
            id="questionNumber"
            defaultValue={10}
          ></input>
        </div>
        <div className="row mb-4 mt-5 ">
          <label className="col-md-2 offset-4" htmlFor="questionNumber">
            Category
          </label>
          <select
            className="col-md-2 input px-2"
            onChange={(e) => {
              dispatch(setCategory(e.target.value));
            }}
          >
            <Categories />
          </select>
        </div>
        <div className="row mb-4 mt-5 ">
          <label className="col-md-2 offset-4" htmlFor="questionNumber">
            Difficulty
          </label>
          <select
            className="col-md-2 input px-2"
            onChange={(e) => {
              dispatch(setDifficulty(e.target.value));
            }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="row mb-4 mt-5 ">
          <label className="col-md-2 offset-4" htmlFor="questionNumber">
            Question Type
          </label>
          <select
            className="col-md-2 input px-2"
            onChange={(e) => {
              dispatch(setType(e.target.value));
            }}
          >
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
        <div className="row mb-4 mt-5 ">
          <NoResultsError responseCode={responseCode} />
          <button
            type="submit"
            className="border-0 col-md-4 offset-4 btn btn-primary mt-4"
          >
            Submit
          </button>
        </div>
        <div className="row mb-4 mt-5 ">
          <button
            onClick={() => router.push("/")}
            className="border-0 col-md-4 offset-4 btn btn-primary"
          >
            Back to Home
          </button>
        </div>
      </form>
      <Image
        src="/logo.png"
        width={150}
        height={150}
        className="img-fluid rounded pt-2 mx-auto d-block"
        alt="Next Question logo"
        onClick={() => router.push("/")}
      />
    </>
  );
}
