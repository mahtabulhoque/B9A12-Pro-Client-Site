import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MostVoted from "./MostVoted";

const Featured = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featuredSurveys = [], isLoading, error } = useQuery({
    queryKey: ['survey', 'mostVoted'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/survey?filterType=mostVoted');
      return data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Get top 6 surveys
  const topSixSurveys = featuredSurveys.slice(0, 6);

  return (
    <>
      <SectionTitle heading={"Most Voted Survey"} />
      <div className="grid md:grid-cols-3 gap-4 p-4">
        {topSixSurveys.map(survey => (
          <MostVoted key={survey._id} survey={survey} />
        ))}
      </div>
    </>
  );
};

export default Featured;
