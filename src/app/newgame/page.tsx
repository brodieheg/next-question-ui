"use client";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useRouter } from "next/navigation";

import {
  fetchQuestions,
  setAmount,
  setCategory,
  setDifficulty,
} from "../store/slices/slices/newGameSlice";
import { AppDispatch, RootState } from "../store/configureStore";
export default function Home() {
  const router = useRouter();
  const state: RootState = useSelector((state) => state.newGame);
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (action: any, payload: any) => {
    dispatch(action(payload));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state);
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
            onChange={() => {
              console.log("hi");
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
            // onChange={(e) => {
            //   console.log(e.target.value);
            // }}
          >
            <option value={"option 1"}>Option 1</option>
            <option value={"option 2"}>Option 2</option>
          </select>
        </div>
        <div className="row mb-4 mt-5 ">
          <label className="col-md-2 offset-4" htmlFor="questionNumber">
            How Many Questions?
          </label>
          <input
            className="col-md-2 input px-2"
            onChange={() => {
              console.log("hi");
            }}
            name="questionNumber"
            type="number"
            id="questionNumber"
            defaultValue={10}
          ></input>
        </div>
        <div className="row mb-4 mt-5 ">
          <label className="col-md-2 offset-4" htmlFor="questionNumber">
            How Many Questions?
          </label>
          <input
            className="col-md-2 input px-2"
            onChange={() => {
              console.log("hi");
            }}
            name="questionNumber"
            type="number"
            id="questionNumber"
            defaultValue={10}
          ></input>
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
