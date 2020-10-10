const mongoose = require('mongoose');
const { body } = require('express-validator');

const FilmSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    height: Number,
    id: String,
    url: String,
    width: Number,
  },
  runningTimeInMinutes: Number,
  titleType: String,
  year: Number,
  releaseDate: Date,
  genres: [String],
  plots: [{ author: String, id: String, text: String }],
  certificate: String,
  fanaticRating: Number,
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: String,
      avatar: String,
      date: {
        type: Date,
        default: Date.now,
      },
      fanaticRating: Number,
    },
  ],
});

const filmValidation = [
  body('id').notEmpty().isString().withMessage('Must be string').trim(),
  body('title').notEmpty().isString().trim(),
  body('releaseDate')
    .custom((val) => {
      const date = new Date(val);
      if (date instanceof Date) return true;
      else throw new Error('Release date is not valid');
    })
    .optional(),
  body('fanaticRating').isNumeric().optional(),
  body('genres').isArray().optional(),
  body('plots').isArray().optional(),
  body('comments').isArray().optional(),
];

const Film = mongoose.model('film', FilmSchema);
module.exports = { Film, filmValidation };
