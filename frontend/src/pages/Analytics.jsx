import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalytics, reset } from '../store/reviewSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Analytics = () => {
  const dispatch = useDispatch();
  const {
    totalReviews,
    averageRating,
    ratingsBreakdown,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(fetchAnalytics());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const chartData = ratingsBreakdown.map((item) => ({
    rating: item._id,
    count: item.count,
  }));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Review Analytics
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">
              {totalReviews}
            </h3>
            <p className="text-gray-600">Total Reviews</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              {averageRating.toFixed(1)}
            </h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Ratings Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
