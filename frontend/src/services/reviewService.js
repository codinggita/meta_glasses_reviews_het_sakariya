import api from './api';

export const getReviews = async (params) => {
  const res = await api.get('/reviews', { params });
  return res.data;
};

export const getReview = async (id) => {
  const res = await api.get(`/reviews/${id}`);
  return res.data;
};

export const createReview = async (reviewData) => {
  const res = await api.post('/reviews', reviewData);
  return res.data;
};

export const updateReview = async (id, reviewData) => {
  const res = await api.put(`/reviews/${id}`, reviewData);
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await api.delete(`/reviews/${id}`);
  return res.data;
};

export const getAnalytics = async () => {
  const res = await api.get('/reviews/analytics');
  return res.data;
};
