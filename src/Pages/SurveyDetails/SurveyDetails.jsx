import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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

  const { title, description } = data;

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
