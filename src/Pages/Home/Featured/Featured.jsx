import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MostVoted from "./MostVoted";


const Featured = () => {
  
  const axiosSecure = useAxiosSecure();

  const { data: featuredSurveys = [], isLoading, error } = useQuery({
    queryKey: ['survey'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/survey?filterType=mostVoted',featuredSurveys);
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Sort surveys based on voteCount in descending order
  const sortedSurveys = featuredSurveys.slice().sort((a, b) => b.voteCount - a.voteCount);

  // Get top 6 surveys
  const topSixSurveys = sortedSurveys.slice(0, 6);

  return (
    <>
      <SectionTitle heading={"Most Voted Survey"} />
      <div className="grid md:grid-cols-3 gap-4 p-4">
        {topSixSurveys.map(surveys => (
          <MostVoted key={surveys._id} survey={surveys} />
        ))}
      </div>
    </>
  );
};

export default Featured;
