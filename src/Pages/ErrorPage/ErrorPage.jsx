import { Link } from "react-router-dom";
import gif from "../../../public/error.gif";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center py-24">
      <div className="error-container text-center">
        <h1 className="error-heading text-4xl">
          404 Oops! Page Not Found.
        </h1>
        <p className="error-message text-2xl">
          We apologize for the inconvenience. Please try again later.
        </p>
        <div className="p-10">
        <img src={gif} alt="Error GIF" className="error-gif rounded-xl w-[500px]" />
        </div>

        <div className="text-center py-10 text-4xl text-blue-600">
        <Link  className="text-[40px] text-red-700" to="/">Back to home</Link>

        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
