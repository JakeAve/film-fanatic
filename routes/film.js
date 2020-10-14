const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');

const { Film, filmValidation, commentValidation } = require('../models/Film');

const fourHundo = (response, ...errors) =>
  response.status(400).json({ errors: [...errors] });
const fiveHundo = (response, err) => {
  console.error(err);
  response.status(500).send('Internal Server Error');
};
// check validation and if id already exists before creating
router.post('/', filmValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return fourHundo(res, errors.array());

    const {
      body,
      body: { id },
    } = req;
    const existingId = await Film.findOne({ id }).exec();
    if (existingId)
      return fourHundo(res, {
        value: id,
        msg: `id already exists`,
        param: 'id',
        location: 'body',
      });
    const film = new Film({
      ...body,
      comments: [],
    });
    await film.save();
    res.status(201).send(film);
  } catch (err) {
    fiveHundo(res, err);
  }
});

router.get('/', async (req, res) => {
  try {
    const films = await Film.find({});
    res.send(films);
  } catch (err) {
    fiveHundo(res, err);
  }
});

router.get('/title/:id', async (req, res) => {
  try {
    const id = `/title/${req.params.id}/`;
    const film = await Film.findOne({ id });
    if (!film) return res.status(404).send('Not Found');
    res.send(film);
  } catch (err) {
    fiveHundo(res, err);
  }
});

router.post('/title/:id', filmValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return fourHundo(res, errors.array());

    const id = `/title/${req.params.id}/`;
    const film = await Film.findOneAndUpdate({ id }, req.body, {
      returnOriginal: false,
    });
    if (!film) return res.status(404).send('Not Found');
    res.send(film);
  } catch (err) {
    fiveHundo(res, err);
  }
});

router.post('/title/:id/new-comment', commentValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return fourHundo(res, errors.array());

    const id = `/title/${req.params.id}/`;
    const film = await Film.findOne({ id });
    if (!film) return res.status(404).send('Not Found');
    console.log(req.body);
    film.comments.push(req.body);
    film.fanaticRating = (
      film.comments.reduce(
        (sum, { fanaticRating }) => sum + Number(fanaticRating),
        0,
      ) / film.comments.length
    ).toFixed(2);

    await film.save();
    res.send(film);
  } catch (err) {
    fiveHundo(res, err);
  }
});

module.exports = router;
