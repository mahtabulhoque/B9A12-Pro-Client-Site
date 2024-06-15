import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TotalSurvey from "./TotalSurvey";

const TotalSurveys = () => {

    const axiosSecure = useAxiosSecure();
    const {data: surveys = []} = useQuery({
        queryKey:['surveys'],
        queryFn: async()=>{
          const {data} = await axiosSecure.get('/surveys')
          console.log(data);
          return data;

        }
    })


    return (
        <div>
            {
                surveys.map(survey =><TotalSurvey key={survey._id} survey={survey}></TotalSurvey>)
            }
        </div>
    );
};

export default TotalSurveys;