import { useContext, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Providers/AuthProvider';

const CreateSurvey = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
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
    questions: [] // Array to store questions
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.post('/create', formData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Survey Created!',
        text: 'Your survey has been successfully created.',
        confirmButtonText: 'OK'
      });
      setFormData({
        name: user.displayName,
        surveyor_email: user.email,
        title: '',
        description: '',
        optionYes: '',
        optionNo: '',
        category: '',
        deadline: '',
        timestamp: new Date().toISOString(),
        questions: [] // Reset questions after submission
      });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData({
      ...formData,
      questions: newQuestions
    });
  };

  const addQuestionField = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, ''] // Add an empty string for a new question
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(formData);
    } catch (error) {
      console.error('Error creating survey:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create a New Survey</h2>
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

        {/* Question Fields */}
        <div className="grid grid-cols-1 gap-4">
          {formData.questions.map((question, index) => (
            <div key={index}>
              <label htmlFor={`question-${index}`} className="block text-sm font-medium text-gray-700">
                Question {index + 1}
              </label>
              <input
                id={`question-${index}`}
                name={`question-${index}`}
                type="text"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestionField}
            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Question
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurvey;
