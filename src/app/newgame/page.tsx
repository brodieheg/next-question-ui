"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Categories from "./Categories";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "../store/configureStore";
import NoResultsError from "../components/NoResultsError";
import { v4 as uuidv4 } from "uuid";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  fetchQuestions,
  setDate,
  setType,
  fetchCategories,
  setCategories,
  setAmount,
  setCategory,
  setDifficulty,
} from "../store/slices/slices/newGameSlice";
import {
  setQuestions,
  setResponseCode,
} from "../store/slices/slices/playGameSlice";

export default function Home() {
  const state = useSelector((state: RootState) => state.user.games);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    console.log(state);
    const resultsCall = async () => {
      const results = await dispatch(fetchCategories());
      dispatch(setCategories(results.payload.trivia_categories));
    };
    resultsCall();
  }, [dispatch, state]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const questions = (await dispatch(fetchQuestions())) as PayloadAction<
      { response_code: number; results: any[] },
      string,
      any
    >;
    dispatch(setResponseCode(questions.payload.response_code));
    if (!questions.payload.response_code) {
      dispatch(setQuestions(questions.payload.results));
      const date = new Date().toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      dispatch(setDate(date));
      router.push("/playgame");
    } else {
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
              if (e.target.value === "any") {
                dispatch(setCategory(null));
              } else {
                dispatch(setCategory(e.target.value));
              }
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
              if (e.target.value === "any") {
                dispatch(setDifficulty(null));
              } else {
                dispatch(setDifficulty(e.target.value));
              }
            }}
          >
            <option key={uuidv4()} value="any">
              Mixed Difficulty
            </option>
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
              if (e.target.value === "any") {
                dispatch(setType(null));
              } else {
                dispatch(setType(e.target.value));
              }
            }}
          >
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
        <div className="row mb-4 mt-5 ">
          <NoResultsError />
          <button
            type="submit"
            className="border-0 col-md-4 offset-4 btn btn-primary mt-4"
          >
            Submit
          </button>
        </div>
        <div className="row mb-1 mt-5"></div>
      </form>
      <Image
        src="/logo.png"
        width={150}
        height={150}
        className="img-fluid rounded mx-auto d-block"
        alt="Next Question logo"
      />
    </>
  );
}
