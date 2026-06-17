const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use('/api', limiter);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running!'
  });
});

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/reviews', require('./routes/reviewRoutes'));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
