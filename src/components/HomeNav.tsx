"use client";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

export default function HomeNav() {
  const authenticated: boolean = false;
  if (authenticated) {
    return (
      <div className="container">
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
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <button
            // onClick={() => router.push("/newgame")}
            className="col-2 offset-5 text-center btn btn-light"
            onClick={() => console.log("sign in")}
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
        </div>
      </div>
    );
  }
}
