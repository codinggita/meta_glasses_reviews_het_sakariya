import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, reset } from '../store/reviewSlice';
import ReviewCard from '../components/ReviewCard';

const MyReviews = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews, isLoading, isError, message } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // Fetch all reviews then filter client-side for simplicity, or add backend endpoint
    dispatch(fetchReviews());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const myReviews = reviews.filter(
    (review) => review.author && review.author._id === user._id
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        My Reviews
      </h1>
      <div className="max-w-4xl mx-auto">
        {myReviews.length > 0 ? (
          myReviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onDelete={() => {
                // No need to refresh since we update state in slice
              }}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            You haven't written any reviews yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;