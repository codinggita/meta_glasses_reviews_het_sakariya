import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { addReview, reset } from '../store/reviewSlice';

const CreateReviewSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  review: Yup.string().required('Required'),
  rating: Yup.string().required('Required'),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.reviews
  );

  const onSubmit = async (values) => {
    const reviewData = {
      ...values,
      name: user?.name,
    };
    await dispatch(addReview(reviewData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Review created successfully!');
      navigate('/reviews');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Write a Review
          </h2>
          <Formik
            initialValues={{ title: '', review: '', rating: '5' }}
            validationSchema={CreateReviewSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Review Title
                  </label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Review
                  </label>
                  <Field
                    name="review"
                    as="textarea"
                    rows="6"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="review"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rating (1-5)
                  </label>
                  <Field
                    name="rating"
                    as="select"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Terrible</option>
                  </Field>
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
