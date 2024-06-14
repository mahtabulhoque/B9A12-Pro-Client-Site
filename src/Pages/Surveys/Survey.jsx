import { Link } from "react-router-dom";

const Survey = ({ survey }) => {
  const { title, category, description, _id,voteCount } = survey;
  console.log(survey);
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl text-green-500">Title: {title}</h2>
       <div className="font-medium">
       <p>Description: {description}</p>
        <p>Category: {category}</p>
     
        <p>VoteCount: {voteCount}</p>
        
       </div>
        <div className="card-actions">
          <Link to ={`/survey/${_id}`}>
          <button className="btn bg-cyan-500 text-lg">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Survey;
