"use client";
import { Inter } from "next/font/google";
import Head from "next/head";
import store from "./store/configureStore";
import { Provider } from "react-redux";
import { Nav } from "./components/Nav";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Next Question</title>
        <meta property="og:title" content="My page title" key="title" />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <Nav />
          <div className="content-under-nav">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
