import { Link } from "react-router-dom";


const DashBoard = () => {
    return (
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Participate in Surveys */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Participate in Surveys</h2>
              <p className="text-gray-600 mb-4">
                Participate in various surveys and share your opinions.
              </p>
              <Link to="/dashboard/user/surveys" className="btn btn-primary">
                Go to Surveys
              </Link>
            </div>
            {/* Reported Surveys */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Reported Surveys</h2>
              <p className="text-gray-600 mb-4">
                View surveys that you have reported for review.
              </p>
              <Link to="/dashboard/user/my-reports" className="btn btn-primary">
                My Reports
              </Link>
            </div>
          </div>
        </div>
      );
    };
    

export default DashBoard;