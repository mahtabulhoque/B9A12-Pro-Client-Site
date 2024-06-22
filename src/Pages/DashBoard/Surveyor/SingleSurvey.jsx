import { useContext } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const SingleSurvey = ({ survey }) => {
  const {user}= useContext(AuthContext);
  const { title, category, deadline, description, voteCount, timestamp, _id } = survey;
  console.log(survey);

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
      <h2 className="card-title text-2xl text-green-500">Title: {title}</h2>
        <div className="font-medium">
          <p>Description: {description}</p>
          <p>Category: {category}</p>
          <p>Deadline: {deadline}</p>
          <p>Creation: {timestamp}</p>
          <p>VoteCount: {voteCount}</p>
          <p>Added By: {user.displayName}</p>
          <p>Email: {user.email}</p>
        </div>
       <div>
       <Link to={`/dashboard/view/update/${_id}`}>
          <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-blue-600">Update</button>
        </Link>
        <Link to={`/survey/${_id}`}>
            <FaEye
              className="text-gray-700 hover:text-blue-500 text-2xl cursor-pointer"
              title="View Details"
            />
          </Link>
       </div>
      </div>
    </div>
  );
};

export default SingleSurvey;