import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const TotalSurvey = ({ survey }) => {
  const [toggle, setToggle] = useState(survey.status);
  const axiosSecure = useAxiosSecure();
  const { mutateAsync } = useMutation({
    mutationFn: async (statusInfo) => {
      const { data } = await axiosSecure.patch(`/survey/update/${survey?._id}`, statusInfo);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Status updated successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleClick = async () => {
    const statusInfo = { status: toggle === 'publish' ? 'unpublish' : 'publish' };
    await mutateAsync(statusInfo);
    setToggle((prevToggle) => (prevToggle === 'publish' ? 'unpublish' : 'publish'));
  };

  const { voteCount, title, category } = survey;

  return (
    <div className="container mx-auto mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 sm:px-6 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">
                Vote Count
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3 md:py-4 text-left text-xs sm:text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-3 py-2 sm:px-6 sm:py-3 md:py-4 whitespace-nowrap">{title}</td>
              <td className="px-3 py-2 sm:px-6 sm:py-3 md:py-4 whitespace-nowrap">{category}</td>
              <td className="px-3 py-2 sm:px-6 sm:py-3 md:py-4 whitespace-nowrap">{voteCount}</td>
              <td className="px-3 py-2 sm:px-6 sm:py-3 md:py-4 whitespace-nowrap">{toggle}</td>
              <td className="px-3 py-2 sm:px-6 sm:py-3 md:py-4 whitespace-nowrap">
                <button
                  onClick={handleClick}
                  className="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                  {toggle === 'publish' ? 'Unpublish' : 'Publish'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalSurvey;
