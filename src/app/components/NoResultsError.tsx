import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
const NoResultsError = () => {
  const responseCode = useSelector(
    (state: RootState) => state.playGame.responseCode
  );
  if (responseCode! > 0) {
    return (
      <>
        <div className="col-md-4 text-center offset-4 p-2 bg-danger">
          No Results from that search. Try adjusting search parameters.
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NoResultsError;
