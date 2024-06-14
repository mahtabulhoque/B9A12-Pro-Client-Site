import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const useSurvey = (filter,sort) => {
    const axiosPublic = UseAxiosPublic();
    const {data: surveys = [], isLoading, refetch}=useQuery({
        queryKey:['surveys', filter,sort],
        queryFn:async()=>{
            const {data} = await axiosPublic.get(`surveys?filter=${filter}& Sort=${sort}`)
            return data
        }
    })
    return [surveys, isLoading, refetch]
};

export default useSurvey;