import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TotalVote from "./TotalVote";

const TotalVotes = () => {
  const axiosSecure = useAxiosSecure();
  const { data: votes = [] } = useQuery({
    queryKey: ['votes'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/votes');
      console.log(data);
      return data;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {votes.map(vote => (
          <TotalVote key={vote._id} vote={vote} />
        ))}
      </div>
    </div>
  );
};

export default TotalVotes;
