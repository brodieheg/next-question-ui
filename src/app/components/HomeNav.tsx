"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/configureStore";
import { AppDispatch } from "../store/configureStore";
import { useEffect } from "react";
import { signout } from "../store/slices/slices/authSlice";
import useLoadUser from "../hooks/useLoadUser";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

export default function HomeNav() {
  const loadUser = useLoadUser();
  const dispatch: AppDispatch = useDispatch();
  // handle play as guest
  const user = useSelector((state: RootState) => state.user);
  const auth = useSelector((state: RootState) => state.auth);
  const authenticated: string | null = auth.authenticated;

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const router = useRouter();
  if (authenticated) {
    return (
      <div className="container">
        <div className="row">
          <h3 className="text-white mt-1 col-md-4 offset-4 text-center">
            {user.email}
          </h3>
        </div>
        <div className="row">
          <h5 className="text-white mt-1 col-md-4 offset-4 text-center">
            Games Played: {user.games.length}
          </h5>
        </div>
        <div className="row">
          <h5 className="text-white mt-1 col-md-4 offset-4 text-center">
            Score Percentage:{" "}
            {Math.floor(
              (user.allTimeScore / user.totalQuestionsAttempted) * 100
            )}
            %
          </h5>
        </div>

        <div className="row">
          <button
            onClick={() => {
              console.log("push");
              router.push("/mygames");
            }}
            className="mt-1 col-2 offset-5 text-center btn btn-light"
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
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <button
            className="col-2 offset-5 text-center btn btn-light"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </button>
        </div>
        <div className="row">
          <button
            className="mt-1 col-2 offset-5 text-center btn btn-light"
            onClick={() => router.push("/signup")}
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
