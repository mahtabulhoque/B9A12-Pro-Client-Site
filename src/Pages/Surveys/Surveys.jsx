import { useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useSurvey from "../../Hooks/useSurvey";
import Survey from "./Survey";

const Surveys = () => {
  const [filter, setFilter] = useState("");  // State to hold filter value
  const [sort, setSort] = useState("");      // State to hold sort value
  const [surveys] = useSurvey(filter, sort); // Fetch surveys based on filter and sort

  const handleFilter = (e) => {
    setFilter(e.target.value);  // Update filter state based on select input
  };

  const handleSort = (e) => {
    setSort(e.target.value);    // Update sort state based on select input
  };

  return (
    <>
      <SectionTitle heading={"Survey"} />
      <div className="mb-4 flex justify-center gap-4">
        <select
          value={filter}
          onChange={handleFilter}
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
          value={sort}
          onChange={handleSort}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Sort by votes</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-3 gap-4 p-4">
        {surveys.map((survey) => (
          <Survey key={survey._id} survey={survey} />
        ))}
      </div>
    </>
  );
};

export default Surveys;
