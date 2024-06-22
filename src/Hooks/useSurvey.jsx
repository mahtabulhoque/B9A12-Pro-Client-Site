import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const useSurveys = (category, sort) => {
  const axiosPublic = UseAxiosPublic();


  const { data: surveys = [], isLoading, refetch } = useQuery({
      queryKey: ['surveys-filter',category, sort],
      queryFn: async () => {
          const { data } = await axiosPublic.get(`surveys-filter?category=${category}&&sort=${sort}`)
          return data
      },
  })
  return [surveys, isLoading, refetch]
};

export default useSurveys;
