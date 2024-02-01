"use client";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
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
      <option key={uuidv4()} value="any">
        Any Category
      </option>
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
