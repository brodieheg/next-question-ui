import { AppDispatch } from "../store/configureStore";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/slices/slices/authSlice";
import {
  storeEmail,
  storeId,
  setAllTimeScore,
  setTotalQuestionsAttempted,
  addGame,
} from "../store/slices/slices/userSlice";
import { setAuthenticated } from "../store/slices/slices/authSlice";

const useLoadUser = () => {
  const dispatch: AppDispatch = useDispatch();
  async function getUser() {
    const response: any = await dispatch(fetchUser());
    dispatch(setAuthenticated(response.payload.token));
    dispatch(storeEmail(response.payload.response.email));
    dispatch(storeId(response.payload.response._id));
    dispatch(setAllTimeScore(response.payload.response.allTimeScore));
    if (Array.isArray(response.payload.response.games)) {
      response.payload.response.games.forEach((game: any) => {
        if (game.dateCreated) {
          dispatch(addGame(game));
        }
      });
    }
    dispatch(
      setTotalQuestionsAttempted(
        response.payload.response.totalQuestionsAttempted
      )
    );
  }
  return getUser;
};
export default useLoadUser;
