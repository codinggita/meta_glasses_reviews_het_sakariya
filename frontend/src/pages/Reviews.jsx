import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, reset } from '../store/reviewSlice';
import ReviewCard from '../components/ReviewCard';

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews, isLoading, isError, message } = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(fetchReviews());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

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
        Meta Glasses Reviews
      </h1>
      <div className="max-w-4xl mx-auto">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
