
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import SingleSurvey from './SingleSurvey';



const View = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: surveys = [], isLoading, isError } = useQuery({
    queryKey: ['survey', user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error('User email is not available');
      const response = await axiosSecure.get(`/surveyor/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  return (
    <div>
      <h2 className="text-[30px] lg:text-[40px] font-extrabold text-center text-green-600 py-10">
        My Surveys
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {surveys.length === 0 ? (
          <h1 className="text-center text-2xl m-10">No data added</h1>
        ) : (
          surveys.map((survey) => (
            <SingleSurvey key={survey._id} survey={survey} />
          ))
        )}
      </div>
    </div>
  );
};

export default View;
