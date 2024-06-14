


const MostVoted = ({survey}) => {
    const { title, category, deadline, description,voteCount,timestamp } = survey;
    console.log(survey);
    return (
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl text-green-500">Title: {title}</h2>
        <div className="font-medium">
          <p>Description: {description}</p>
          <p>Category: {category}</p>
          <p>Deadline: {deadline}</p>
          <p>Creation: {timestamp}</p>
          <p>VoteCount: {voteCount}</p>
        </div>
         
        </div>
      </div>
    );
};

export default MostVoted;