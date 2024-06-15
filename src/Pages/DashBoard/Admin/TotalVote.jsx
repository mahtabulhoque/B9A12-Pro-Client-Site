
const TotalVote = ({vote}) => {
   const {title, totalVote, comment} = vote
    return (
        <div className="overflow-x-auto mt-4">
        <table className="table min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Vote</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="bg-base-200">
           
              <td className="px-6 py-4 whitespace-nowrap">{title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{totalVote}</td>
              <td className="px-6 py-4 whitespace-nowrap">{comment}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
};

export default TotalVote;