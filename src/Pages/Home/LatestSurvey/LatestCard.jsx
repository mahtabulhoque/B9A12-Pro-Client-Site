
const LatestCard = ({survey}) => {
    const { title, category, deadline, description,voteCount,timestamp } = survey;

    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Title: {title}</h2>
          <p>Description: {description}</p>
          <p>Category: {category}</p>
          <p>Deadline: {deadline}</p>
          <p>VoteCount: {voteCount}</p>
          <p>Creation: {timestamp}</p>

        </div>
      </div>
    );
};

export default LatestCard;