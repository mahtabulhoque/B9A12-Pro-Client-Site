import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

const SurveyDetails = () => {
  const { id } = useParams(); // Use useParams to get the survey ID from the URL
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  
  const { isLoading, isError, error } = useQuery({
    queryKey: ['survey', id],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`http://localhost:5000/survey/${id}`);
        setData(response.data);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching data');
      }
    }
  });

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  if (isError) {
    return <p>Error fetching data: {error.message}</p>;
  }

  if (data.length === 0) {
    return <p>No survey data available</p>;
  }

  const { title, category, deadline, description,_id} = data;

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Title: {title}</h2>
        <p>Category: {category}</p>
        <p>Description: {description}</p>
        <p>Deadline: {deadline}</p>
        <div className="card-actions">
         <Link to={`/votes/${_id}`}>
         <button className="btn btn-primary">Vote</button>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
