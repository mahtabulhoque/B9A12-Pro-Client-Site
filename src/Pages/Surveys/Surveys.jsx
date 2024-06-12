import  { useState, useEffect } from 'react';
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Survey from "./Survey";

const Surveys = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { data: surveys = [] } = useQuery({
    queryKey: ['survey'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/survey');
      return data;
    }
  });

  useEffect(() => {
    let updatedSurveys = selectedCategory === '' 
      ? surveys 
      : surveys.filter(survey => survey.category === selectedCategory);

    if (sortOrder === 'asc') {
      updatedSurveys = updatedSurveys.sort((a, b) => a.votes - b.votes);
    } else if (sortOrder === 'desc') {
      updatedSurveys = updatedSurveys.sort((a, b) => b.votes - a.votes);
    }

    setFilteredSurveys(updatedSurveys);
  }, [selectedCategory, sortOrder, surveys]);

  return (
    <>
      <SectionTitle heading={"Most Voted Survey"} />
      <div className="mb-4 flex gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="asc">Sort by votes: Ascending</option>
          <option value="desc">Sort by votes: Descending</option>
        </select>
      </div>
      <div className="grid md:grid-cols-3 gap-4 p-4">
        {filteredSurveys.length > 0 ? (
          filteredSurveys.map(survey => (
            <Survey key={survey._id} survey={survey} />
          ))
        ) : (
          <p>No surveys available in this category</p>
        )}
      </div>
    </>
  );
};

export default Surveys;
