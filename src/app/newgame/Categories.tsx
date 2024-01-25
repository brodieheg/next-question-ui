"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";

export default function Categories() {
  interface category {
    id: number;
    name: string;
  }

  const categories: category[] = useSelector(
    (state) => state.newGame.categories
  );
  return (
    <>
      {categories.map((category, index) => {
        return (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        );
      })}
    </>
  );
}
