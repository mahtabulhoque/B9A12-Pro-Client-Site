import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Report from "./Report";

const MyReports = () => {
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading, error } = useQuery({
      queryKey: ['survey', 'mostVoted'],
      queryFn: async () => {
        const { data } = await axiosSecure.get('/survey');
        return data;
      }
    });
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  


   
    return (
        <>
          <SectionTitle heading={"Comments"} />
          <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-4 p-4">
        {data.map((survey) => (
          <Report key={survey._id} survey={survey} />
        ))}
      </div>
        </>
      );
};

export default MyReports;