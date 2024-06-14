import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Providers/AuthProvider';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: survey, isLoading, error } = useQuery({
    queryKey: ['survey', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/survey/${id}`);
      return data;
    }
  });

  const [formData, setFormData] = useState({
    name: user.displayName,
    surveyor_email: user.email,
    title: '',
    description: '',
    optionYes: '',
    optionNo: '',
    category: '',
    deadline: '',
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    if (survey) {
      setFormData({
        name: survey.name,
        surveyor_email: survey.surveyor_email,
        title: survey.title,
        description: survey.description,
        optionYes: survey.optionYes,
        optionNo: survey.optionNo,
        category: survey.category,
        deadline: survey.deadline,
        timestamp: survey.timestamp,
      });
    }
  }, [survey]);

  const { mutateAsync } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.put(`/update/${id}`, formData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Survey Updated!',
        text: 'Your survey has been successfully updated.',
        confirmButtonText: 'OK'
      });
      navigate('/dashboard/view');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(formData);
    } catch (error) {
      console.error('Error updating survey:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading survey data.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Survey</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Survey Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="optionYes" className="block text-sm font-medium text-gray-700">
              Option Yes
            </label>
            <input
              id="optionYes"
              name="optionYes"
              type="text"
              value={formData.optionYes}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="optionNo" className="block text-sm font-medium text-gray-700">
              Option No
            </label>
            <input
              id="optionNo"
              name="optionNo"
              type="text"
              value={formData.optionNo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Update Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
