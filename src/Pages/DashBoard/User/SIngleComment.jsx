import  { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';

const SIngleComment = ({ survey }) => {
  const { title, category, description, _id, voteCount } = survey;
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0); // Track user's comment count
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      if (!user) return; // Exit early if user is not available

      try {
        const response = await axiosSecure.get(`/survey/${_id}/comments/${user.email}`);
        if (response.status === 200) {
          setComments(response.data); // Update comments state with fetched comments
          // Count user's comments for this survey
          const userComments = response.data.filter(comment => comment.userEmail === user.email);
          setCommentCount(userComments.length);
        } else {
          console.error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [axiosSecure, _id, user]); // Include user in dependency array to handle changes

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handlePostComment = async () => {
    if (!user) {
      console.error('User not logged in');
      return;
    }

    try {
      if (commentCount >= 2) {
        console.log('You have reached the comment limit for this survey.');
        return;
      }

      const response = await axiosSecure.post(`/survey/${_id}/comment`, {
        comment: newComment,
        userEmail: user.email,
        userName: user.displayName,
      });

      if (response.status === 201) {
        console.log('Comment posted:', response.data);
        setNewComment(''); // Clear input field after successful post

        // Update local state with the new comment for this survey
        setComments([
          ...comments,
          {
            comment: newComment,
            timestamp: new Date().toISOString(),
            userEmail: user.email,
            userName: user.displayName,
          },
        ]);

        // Increment comment count
        setCommentCount(commentCount + 1);
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
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
          <p>VoteCount: {voteCount}</p>
        </div>
        
        {/* Display existing comments for this survey */}
        {comments.map((comment, index) => (
          <div key={index} className="mt-4">
            <p>{comment.comment}</p>
            <p className="text-xs text-gray-500">Commented by {comment.userName} ({comment.userEmail}) on: {new Date(comment.timestamp).toLocaleString()}</p>
          </div>
        ))}

        {/* Input field for new comment */}
        <div className="mt-4">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleCommentChange}
          />
          <button onClick={handlePostComment} className="btn btn-sm mt-2 bg-blue-500 text-white" disabled={commentCount >= 2}>
            {commentCount >= 2 ? 'Comment Limit Reached' : 'Comment Here'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SIngleComment;
