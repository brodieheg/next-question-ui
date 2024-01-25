"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Categories from "./Categories";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useRouter } from "next/navigation";

import {
  fetchQuestions,
  setType,
  fetchCategories,
  setCategories,
  setAmount,
  setCategory,
  setDifficulty,
} from "../store/slices/slices/newGameSlice";
import { AppDispatch, RootState } from "../store/configureStore";
export default function Home() {
  const router = useRouter();
  const state: RootState = useSelector((state) => state.newGame);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const resultsCall = async () => {
      const results = await dispatch(fetchCategories());
      dispatch(setCategories(results.payload.trivia_categories));
    };
    resultsCall();
  }, []);
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              console.log(state);
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
              console.log(state);
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
              console.log(state);
            }}
          >
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
      </form>
      <Image
        src="/logo.png"
        width={220}
        height={220}
        className="img-fluid rounded pt-5 mx-auto d-block"
        alt="Next Question logo"
        role="button"
        onClick={() => router.push("/")}
      />
    </>
  );
}
