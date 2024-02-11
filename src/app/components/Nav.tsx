"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../store/slices/slices/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "../store/configureStore";
import useLoadUser from "../hooks/useLoadUser";

export const Nav = () => {
  const loadUser = useLoadUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );

  const email = useSelector((state: RootState) => state.user.email);
  const games = useSelector((state: RootState) => state.user.games);
  const uniqueGames = games.filter((game: any) => {
    if (game.dateCreated !== null) {
      return true;
    }
    return false;
  });
  useEffect(() => {
    console.log(games);
    console.log(uniqueGames);
    if (authenticated) {
      loadUser();
    }
  }, [authenticated]);

  const handleSignOutClick = () => {
    dispatch(signout());
    router.push("/");
  };

  const renderLinks = () => {
    if (authenticated) {
      return (
        <>
          <Link href="/mygames">
            <li>My Games: {uniqueGames.length}</li>
          </Link>
          <li>{email}</li>
          <li>
            <LinkButton onClick={handleSignOutClick}>Sign Out</LinkButton>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
          <li>
            <Link href="/signin">Sign In</Link>
          </li>
        </>
      );
    }
  };

  return (
    <NavContainer>
      <div id="logo">
        <Link href="/">Back To Home</Link>
      </div>
      <NavUl>{renderLinks()}</NavUl>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  position: fixed;
  z-index: 999;
  background: white;
  opacity: 0.95;
  color: black;
  margin: 0;
  width: 100%;
  height: auto;
  padding: 1.5em;
  #logo {
    position: relative;
    float: left;
    width: 150px;
    height: auto;
  }
  a {
    color: black;
    text-decoration: none;
    font-weight: bold;
  }
`;

const NavUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
  li:first-child {
    float: left;
  }
  li {
    margin-left: 0.8em;
  }
  li a {
    color: black;
    text-decoration: none;
    font-weight: bold;
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  font-weight: bold;
`;
