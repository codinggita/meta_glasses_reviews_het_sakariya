const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please add a product name']
  },
  reviewTitle: {
    type: String,
    required: [true, 'Please add a review title']
  },
  reviewText: {
    type: String,
    required: [true, 'Please add a review text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  helpfulCount: {
    type: Number,
    default: 0
  },
  verifiedPurchase: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    default: []
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
ReviewSchema.index({ productName: 'text', reviewTitle: 'text', reviewText: 'text' });

module.exports = mongoose.model('Review', ReviewSchema);
