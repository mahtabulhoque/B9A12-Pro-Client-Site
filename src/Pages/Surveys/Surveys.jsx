
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Survey from "../Home/Featured/Survey";

const Surveys = () => {
  const axiosSecure= useAxiosSecure();

  const { data: surveys = [] } = useQuery({
    queryKey: ['survey'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/survey');
      return data;
    }
  });

  console.log(surveys);

  return (
    <>
      <SectionTitle heading={"Most Voted Survey"} />
      <div className="grid md:grid-cols-3 gap-4 p-4">
        {/* Map through the surveys and return Survey component for each */}
        {surveys.map(survey => (
         <Survey key={survey._id} survey={survey}></Survey>
        ))}
      </div>
    </>
  );
};

export default Surveys;