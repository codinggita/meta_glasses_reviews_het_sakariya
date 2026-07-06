const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  reviewID: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please add reviewer name']
  },
  date: {
    type: String
  },
  verifiedPurchase: {
    type: String,
    default: 'False'
  },
  rating: {
    type: String,
    required: [true, 'Please add rating']
  },
  helpful: {
    type: String
  },
  title: {
    type: String,
    required: [true, 'Please add review title']
  },
  review: {
    type: String,
    required: [true, 'Please add review text']
  },
  profile: {
    type: String
  },
  country: {
    type: String
  },
  reviewLink: {
    type: String
  },
  reviewImage: {
    type: String
  },
  helpful_aug: {
    type: String
  },
  is_positive_review: {
    type: String
  },
  helpfulness_score: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ReviewSchema.index({ rating: 1, createdAt: -1 });
ReviewSchema.index({ title: 'text', review: 'text', name: 'text', country: 'text' });

module.exports = mongoose.model('Review', ReviewSchema);
