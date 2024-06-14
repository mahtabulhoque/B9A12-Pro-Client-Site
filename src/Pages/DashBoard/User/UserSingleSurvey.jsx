import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserSingleSurvey = ({ survey }) => {
  const { title, category, description, _id, voteCount } = survey;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [surveyAnswers, setSurveyAnswers] = useState([]);

  // Function to fetch questions for a survey
  const fetchQuestions = async () => {
    try {
      const response = await axiosSecure.get(`/survey/${_id}/questions`);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };

  // useQuery hook to fetch questions
  const {
    data: questions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["surveyQuestions", _id],
    queryFn: fetchQuestions,
  });

  // useMutation hook for submitting survey answers
  const mutation = useMutation({
    mutationFn: (newAnswers) =>
      axiosSecure.post("/api/submit-survey", {
        answers: newAnswers,
        surveyId: _id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["surveyQuestions", _id]);
      setSurveyAnswers([]);
      setShowModal(false);
      // Show success notification
      Swal.fire({
        icon: "success",
        title: "Survey Submitted!",
        text: "Thank you for participating in the survey.",
        confirmButtonText: "OK",
      });
    },
    onError: () => {
      // Show error notification
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "An error occurred while submitting the survey.",
        confirmButtonText: "OK",
      });
    },
  });

  // Function to open modal
  const handleOpenModal = () => setShowModal(true);

  // Function to close modal
  const handleCloseModal = () => setShowModal(false);

  // Function to handle answer change
  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...surveyAnswers];
    newAnswers[index] = answer;
    setSurveyAnswers(newAnswers);
  };

  // Function to check if all questions are answered
  const allQuestionsAnswered = () => {
    return (
      surveyAnswers.length === questions.length &&
      surveyAnswers.every((answer) => answer !== undefined)
    );
  };

  // Function to handle survey submission
  const handleSubmitSurvey = () => {
    if (allQuestionsAnswered()) {
      mutation.mutate(surveyAnswers);
    } else {
      // Optionally show an alert or message to inform the user
      alert("Please answer all questions before submitting.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading questions</div>;

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl text-green-500">Title: {title}</h2>
        <div className="font-medium">
          <p>Description: {description}</p>
          <p>Category: {category}</p>
          <p>VoteCount: {voteCount}</p>
        </div>
        <div className="card-actions">
          <Link to={`/survey/${_id}`}>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-blue-700 hover:bg-green-500 text-white">
              View Details
            </button>
          </Link>
          <button
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-amber-500 hover:bg-red-700 text-white"
            onClick={handleOpenModal}
          >
            Participate in Survey
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>

          <div className="modal-container bg-white w-full sm:w-96 mx-auto rounded-lg z-50 overflow-y-auto">
            {/* Modal Header */}
            <div className="modal-header px-4 py-3 bg-gray-200 rounded-t-lg">
              <h2 className="text-xl font-bold text-gray-800">
                Survey Questions
              </h2>
              <button
                className="modal-close ml-auto focus:outline-none"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body px-4 py-6">
              <ul>
                {questions.map((question, index) => (
                  <li key={index} className="mb-4">
                    <p className="font-medium">{question}</p>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-cyan-500"
                          name={`question-${index}`}
                          value="yes"
                          checked={surveyAnswers[index] === "yes"}
                          onChange={() => handleAnswerChange(index, "yes")}
                        />
                        <span className="ml-2">Yes</span>
                      </label>
                      <label className="inline-flex items-center ml-6">
                        <input
                          type="radio"
                          className="form-radio text-cyan-500"
                          name={`question-${index}`}
                          value="no"
                          checked={surveyAnswers[index] === "no"}
                          onChange={() => handleAnswerChange(index, "no")}
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer px-4 py-3 bg-gray-200 rounded-b-lg">
              <button
                className="btn btn-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                onClick={handleSubmitSurvey}
                disabled={!allQuestionsAnswered()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSingleSurvey;
