import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const useSurvey = (filter, sort) => {
  const axiosPublic = UseAxiosPublic();
  const { data: surveys = [], isLoading, refetch } = useQuery({
    queryKey: ['surveys', filter, sort],
    queryFn: async () => {
      const url = `surveys${filter ? `?filter=${filter}` : ''}${sort ? `&sort=${sort}` : ''}`;
      const { data } = await axiosPublic.get(url);
      return data;
    }
  });
  return [surveys, isLoading, refetch];
};

export default useSurvey;
