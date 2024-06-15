import  { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';

const Report = ({ survey }) => {
  const { title, category, description, _id, voteCount } = survey;
  const [reports, setReports] = useState([]);
  const [reportCount, setReportCount] = useState(0); // Track user's report count
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return; // Exit early if user is not available

      try {
        const response = await axiosSecure.get(`/survey/${_id}/report/${user.email}`);
        if (response.status === 200) {
          setReports(response.data); // Update reports state with fetched reports
          // Count user's reports for this survey
          const userReports = response.data.filter(report => report.userEmail === user.email);
          setReportCount(userReports.length);
        } else {
          console.error('Failed to fetch reports');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [axiosSecure, _id, user]); // Include user in dependency array to handle changes

  const handlePostReport = async (reportType) => {
    if (!user) {
      console.error('User not logged in');
      return;
    }

    try {
      if (reportCount >= 1) {
        console.log('You have reached the report limit for this survey.');
        return;
      }

      const response = await axiosSecure.post(`/survey/${_id}/report`, {
        report: reportType,
        userEmail: user.email,
        userName: user.displayName,
      });

      if (response.status === 201) {
        console.log('Report posted:', response.data);

        // Update local state with the new report for this survey
        setReports([
          ...reports,
          {
            report: reportType,
            timestamp: new Date().toISOString(),
            userEmail: user.email,
            userName: user.displayName,
          },
        ]);

        // Increment report count
        setReportCount(reportCount);
      } else {
        console.error('Failed to post report');
      }
    } catch (error) {
      console.error('Error posting report:', error);
    }
  };

  // Render loading or disabled state if user is not available
  if (!user) {
    return <div>Loading...</div>; // or handle the case where user is not available
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl text-green-500">Title: {title}</h2>
        <div className="font-medium">
          <p>Description: {description}</p>
          <p>Category: {category}</p>
          <p>Vote Count: {voteCount}</p>
        </div>

        {/* Display existing reports */}
        {reports.map((report, index) => (
          <div key={index} className="mt-4">
            <p>{report.report}</p>
            <p className="text-xs text-gray-500">
              Reported by {report.userName} ({report.userEmail}) on: {new Date(report.timestamp).toLocaleString()}
            </p>
          </div>
        ))}

        {/* Buttons for reporting */}
        <div className="mt-4">
          <button onClick={() => handlePostReport('bad')} className="btn btn-sm mt-2 bg-red-600 text-white" disabled={reportCount >= 1}>
            Bad
          </button>
          <button onClick={() => handlePostReport('worst')} className="btn btn-sm mt-2 bg-red-800 text-white" disabled={reportCount >= 1}>
            Worst
          </button>
          <button onClick={() => handlePostReport('good')} className="btn btn-sm mt-2 bg-green-400 text-white" disabled={reportCount >= 1}>
            Good
          </button>
          <button onClick={() => handlePostReport('better')} className="btn btn-sm mt-2 bg-green-500 text-white" disabled={reportCount >= 1}>
            Better
          </button>
          <button onClick={() => handlePostReport('best')} className="btn btn-sm mt-2 bg-green-700 text-white" disabled={reportCount >= 1}>
            Best
          </button>
        </div>

        {/* Show message if report limit reached */}
        {reportCount >= 2 && <p className="text-red-500 mt-2">Report limit reached for this survey.</p>}
      </div>
    </div>
  );
};

export default Report;
