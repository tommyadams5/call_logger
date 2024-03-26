import { RotatingLines } from "react-loader-spinner";
import "./Loader.css";

// Loading screen while waiting for API request
const Loader = () => {
  return (
    <div className="loader_modal">
      <div className="loader">
        <div className="loader_message">Analyzing Documents</div>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
