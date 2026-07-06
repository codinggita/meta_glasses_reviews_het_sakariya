const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/v1/reviews
// @access  Public
const getReviews = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    let query = Review.find(JSON.parse(queryStr)).populate('author', 'name email');

    if (req.query.search) {
      query = query.find({
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { review: { $regex: req.query.search, $options: 'i' } },
          { name: { $regex: req.query.search, $options: 'i' } },
          { country: { $regex: req.query.search, $options: 'i' } }
        ]
      });
    }

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Review.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const reviews = await query;
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: reviews.length,
      pagination,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single review
// @route   GET /api/v1/reviews/:id
// @access  Public
const getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate('author', 'name email');

    if (!review) {
      res.status(404);
      throw new Error(`Review not found with id ${req.params.id}`);
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create review
// @route   POST /api/v1/reviews
// @access  Private
const createReview = async (req, res, next) => {
  try {
    req.body.author = req.user._id;
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review
// @route   PUT /api/v1/reviews/:id
// @access  Private
const updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404);
      throw new Error(`Review not found with id ${req.params.id}`);
    }

    if (review.author && review.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to update this review');
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404);
      throw new Error(`Review not found with id ${req.params.id}`);
    }

    if (review.author && review.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to delete this review');
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get review analytics
// @route   GET /api/v1/reviews/analytics
// @access  Private
const getAnalytics = async (req, res, next) => {
  try {
    const analytics = await Review.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalReviews = await Review.countDocuments();
    const avgRating = await Review.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: { $toDouble: '$rating' } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      totalReviews,
      averageRating: avgRating[0]?.avgRating || 0,
      ratingsBreakdown: analytics
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  getAnalytics
};
