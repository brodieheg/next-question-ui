"use client";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store/configureStore";

export default function Categories() {
  type Category = {
    id: number;
    name: string;
  };

  const categories = useSelector(
    (state: RootState) => state.newGame.categories
  ) as Category[];
  return (
    <>
      <option key={uuidv4()} value="any">
        Any Category
      </option>
      {categories.map((category, index: number) => {
        return (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        );
      })}
    </>
  );
}
