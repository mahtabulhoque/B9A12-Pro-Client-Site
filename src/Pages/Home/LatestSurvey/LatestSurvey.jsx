import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LatestCard from "./LatestCard";

const LatestSurvey = () => {
  const axiosSecure = useAxiosSecure();

  const { data: latestSurveys = [], isLoading, error } = useQuery({
    queryKey: ['survey', 'latest'],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get('/survey?filterType=latest');
        return data;
      } catch (error) {
        throw new Error("Failed to fetch latest surveys");
      }
    },
  });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if latestSurveys is an array and not empty
  if (!Array.isArray(latestSurveys) || latestSurveys.length === 0) {
    return <div>No latest surveys found</div>;
  }

  // Display only the first 6 surveys
  const latestSixSurveys = latestSurveys.slice(0, 6);

  return (
    <>
      <SectionTitle heading={"Latest Survey"} />
      <div className="grid md:grid-cols-3 gap-4 p-4">
        {latestSixSurveys.map((survey) => (
          <LatestCard key={survey._id} survey={survey} />
        ))}
      </div>
    </>
  );
};

export default LatestSurvey;
