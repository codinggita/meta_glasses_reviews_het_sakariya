const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{review.name}</h3>
          <p className="text-sm text-gray-500">{review.country || 'Unknown'}</p>
        </div>
        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
          {review.rating} ★
        </span>
      </div>
      <h4 className="text-lg font-semibold text-gray-700 mb-2">{review.title}</h4>
      <p className="text-gray-600 mb-3">{review.review}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>
          {review.helpful && `${review.helpful} people found this helpful`}
        </span>
        <span>{review.date}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
