"use client";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import Image from "next/image";
import store from "./store/configureStore";
import dynamic from "next/dynamic";
import HomeNav from "./components/HomeNav";

export default function Home() {
  const authenticated: boolean = true;
  if (authenticated) {
    return (
      <>
        <main className="logo-image">
          <Image
            src="/logo.png"
            width={450}
            height={450}
            className="img-fluid rounded mx-auto d-block"
            alt="Next Question logo"
          />
          <HomeNav />
        </main>
      </>
    );
  }
}
