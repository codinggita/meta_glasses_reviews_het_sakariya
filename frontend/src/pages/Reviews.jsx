import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, reset } from '../store/reviewSlice';
import ReviewCard from '../components/ReviewCard';

const Reviews = () => {
  const [search, setSearch] = useState('');
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

  const filteredReviews = reviews.filter((review) =>
    (review.title && review.title.toLowerCase().includes(search.toLowerCase())) ||
    (review.review && review.review.toLowerCase().includes(search.toLowerCase())) ||
    (review.name && review.name.toLowerCase().includes(search.toLowerCase()))
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
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Meta Glasses Reviews
      </h1>
      <div className="max-w-4xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="max-w-4xl mx-auto">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No reviews found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
