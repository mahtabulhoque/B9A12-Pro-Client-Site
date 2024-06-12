import { Link } from "react-router-dom";

const SingleSurvey = ({survey}) => {
    

    const { title, category, deadline, description,voteCount,timestamp,_id } = survey;
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
             <Link to={`dashboard/update/${_id}`}>
             <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-blue-600" >Update</button>
             </Link>    
          </div>
        </div>
      );
};

export default SingleSurvey;