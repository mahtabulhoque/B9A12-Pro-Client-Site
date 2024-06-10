import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Survey from "./Survey";

const Featured = () => {
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
          <Survey key={survey._id} survey={survey} />
        ))}
      </div>
    </>
  );
};

export default Featured;
