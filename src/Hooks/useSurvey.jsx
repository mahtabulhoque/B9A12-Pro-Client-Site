import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const useSurveys = (filter, sort) => {
  const axiosPublic = UseAxiosPublic();


  const { data: surveys = [], isLoading, refetch } = useQuery({
      queryKey: ['surveys', filter, sort],
      queryFn: async () => {
          const { data } = await axiosPublic.get(`surveys?filter=${filter}&sort=${sort}`)
          return data
      },
  })
  return [surveys, isLoading, refetch]
};

export default useSurveys;
