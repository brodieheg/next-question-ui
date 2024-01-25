"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/configureStore";
import { AppDispatch } from "../store/configureStore";
import { useEffect } from "react";
import { setAmount, fetchQuestions } from "../store/slices/slices/newGameSlice";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

export default function HomeNav() {
  const dispatch: AppDispatch = useDispatch();
  // handle play as guest
  const state = useSelector((state: RootState) => state.newGame);
  useEffect(() => {
    dispatch(setAmount(state.amount ? state.amount + 1 : 1));
    console.log(state);
  }, []);
  const router = useRouter();
  const authenticated: boolean = false;
  if (authenticated) {
    return (
      <div className="container">
        <div className="blue">
          <div className="row">
            <button
              // onClick={() => router.push("/newgame")}
              className="col-2 offset-5 text-center btn btn-light"
            >
              My Games
            </button>
          </div>
          <div className="row">
            <button
              className="mt-1 col-2 offset-5 text-center btn btn-light"
              onClick={() => router.push("/newgame")}
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <button
            // onClick={() => router.push("/newgame")}
            className="col-2 offset-5 text-center btn btn-light"
            onClick={() => console.log(state)}
          >
            Sign In
          </button>
        </div>
        <div className="row">
          <button
            className="mt-1 col-2 offset-5 text-center btn btn-light"
            onClick={() => console.log("sign up")}
          >
            Sign Up
          </button>
          <button
            className="mt-1 col-2 offset-5 text-center btn btn-light"
            onClick={() => router.push("/newgame")}
          >
            Play as Guest
          </button>
        </div>
      </div>
    );
  }
}
