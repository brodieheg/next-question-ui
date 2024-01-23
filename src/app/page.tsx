import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import Image from "next/image";
import HomeNav from "@/components/HomeNav";
// import styles from "./page.module.css";

export default function Home() {
  const authenticated: boolean = true;
  if (authenticated) {
    return (
      <main className="logo-image">
        <Image
          src="/logo.png"
          width={450}
          height={450}
          className="img-fluid rounded pt-5 mx-auto d-block"
          alt="Next Question logo"
        />
        <HomeNav />
      </main>
    );
  }
}
