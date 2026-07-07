import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteReview, reset } from '../store/reviewSlice';
import { getReview } from '../services/reviewService';

const ReviewCard = ({ review, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOwner = user && review.author && review.author._id === user._id;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      await dispatch(deleteReview(review._id));
      if (onDelete) onDelete(review._id);
      dispatch(reset());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{review.name}</h3>
          <p className="text-sm text-gray-500">
            {review.country || 'Unknown'} • {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
          {review.rating} ★
        </span>
      </div>
      <h4 className="text-lg font-semibold text-gray-700 mb-2">{review.title}</h4>
      <p className="text-gray-600 mb-3">{review.review}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {review.helpful && `${review.helpful} people found this helpful`}
        </span>
        <div className="flex gap-2">
          {isOwner && (
            <>
              <Link
                to={`/reviews/${review._id}/edit`}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
