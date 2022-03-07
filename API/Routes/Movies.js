const router = require('express').Router();
const Movie = require('../Models/Movies');
const verify = require('../verifyToken');

// CREATE
router.post('/', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newMovie = new Movie(req.body);
      await newMovie.save();
      res.status(200).json(newMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json('You are not allowed!');
  }
});

// UPDATE
router.put('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json('You are not allowed!');
  }
});

// DELETE
router.delete('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status('Movie has been deleted!');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json('You are not allowed!');
  }
});

// GET
router.get('/find/:id', verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET RANDOM

router.get('/random', verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === 'series') {
      movie = await Movie.aggregate([{ $match: { isSeries: true } }, { $sample: { size: 1 } }]);
    } else {
      movie = await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }]);
    }
    res.status(200).json(movie);
    res.status(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL

router.get('/', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movie = await Movie.find();
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json('Unauthorized');
  }
});

module.exports = router;
