import { useLoaderData, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";

import { useMutation } from "@tanstack/react-query";

// import toast from "react-hot-toast";

// import vote from "../../assets/images/vote.png";
// import useProUser from "../../hooks/useProUser";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Vote = () => {
    

    
  const survey = useLoaderData();
  
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const [voteOption, setVoteOption] = useState("");
  const axiosSecure = useAxiosSecure();
//   const [isProUser] = useProUser();

const { mutateAsync } = useMutation({
    mutationFn: async (voteSurveyData) => {
      const { data } = await axiosSecure.post('/votes', voteSurveyData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Vote Submitted!',
        text: 'Thank you for your vote.',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate("/surveys");
      });
    },
  });

  const { title, category, deadline, description, optionNo,
    optionYes,_id } = survey || {};
    

    const handleVoteSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const comment = form.comment ? form.comment.value : "";
      const voter_email = user?.email;
      const voter_name = user?.displayName;
    
      const voter = {
        voter_email,
        voter_name,
      };
    
      try {
        const voteSurveyData = {
          voteId: _id,
          voter,
          voteOption,
          comment,
          voteCount: survey.voteCount + 1,  // Increment voteCount
          totalVote: survey.totalVote + 1,  // Increment totalVote
          title,
          category,
          deadline,
          description,
          optionNo,
          optionYes,
        };
    
        
    
        // Post data to backend
        await mutateAsync(voteSurveyData);
    
      } catch (error) {
        console.error("Error submitting vote:", error);
      }
    };

  return (
    <div className="w-full h-full mt-12 md:20 lg:mt-24">
     

      <div className="">
        <div className="container text-black  max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-2xl">
          <div className="mt-3">
            <h2 className="text-2xl font-bold hover:underline">{category}</h2>
          </div>

          <h3 className="text-xl font-semibold my-3">
            Are you positive about this Survey?
          </h3>

          <div className="mt-16">
            <form onSubmit={handleVoteSubmit}>
              <div className="flex gap-12">
                <div className="flex items-center gap-1">
                  <label className="text-lg font-semibold" htmlFor="yes">
                    Yes
                  </label>
                  <input
                    type="radio"
                    id="yes"
                    name="option"
                    value="yes"
                    checked={voteOption === "yes"}
                    onChange={(e) => setVoteOption(e.target.value)}
                    className="mt-[2px] "
                  />
                </div>
                <br />
                <div className="flex items-center gap-1">
                  <label className="text-lg font-semibold" htmlFor="no">
                    No
                  </label>
                  <input
                    type="radio"
                    id="no"
                    name="option"
                    value="no"
                    checked={voteOption === "no"}
                    onChange={(e) => setVoteOption(e.target.value)}
                    className="mt-[2px] "
                  />
                </div>
              </div>

              <br />
              <input
                type="submit"
                value="Submit"
                className="btn bg-green-500 text-white text-lg border-0 rounded-xl "
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;

