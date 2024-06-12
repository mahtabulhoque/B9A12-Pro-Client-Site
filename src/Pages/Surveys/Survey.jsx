import { Link } from "react-router-dom";

const Survey = ({ survey }) => {
  const { title, category, deadline, description, _id,voteCount,timestamp } = survey;
  console.log(survey);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Title: {title}</h2>
        <p>Description: {description}</p>
        <p>Category: {category}</p>
        <p>Deadline: {deadline}</p>
        <p>VoteCount: {voteCount}</p>
        <p>Creation: {timestamp}</p>
        <div className="card-actions">
          <Link to ={`/survey/${_id}`}>
          <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Survey;
