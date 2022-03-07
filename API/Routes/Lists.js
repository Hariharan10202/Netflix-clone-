const router = require('express').Router();
const List = require('../Models/List');
const verify = require('../verifyToken');

// CREATE
router.post('/', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newList = new List(req.body);
      await newList.save();
      res.status(200).json(newList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json('You are not allowed!');
  }
});

// DELETE

// CREATE
router.delete('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json('List has been deleted');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json('You are not allowed!');
  }
});

// GET
router.get('/', verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  if (req.user.isAdmin) {
    try {
      if (typeQuery) {
        if (genreQuery) {
          list = await List.aggregate([
            { $sample: { size: 10 } },
            {
              $match: {
                type: typeQuery,
                genre: genreQuery,
              },
            },
          ]);
        } else {
          list = await List.aggregate([{ $sample: { size: 10 } }, { $match: { type: typeQuery } }]);
        }
      } else {
        list = await List.aggregate([{ $sample: { size: 10 } }]);
      }
    } catch (error) {
      res.status(500).json(error);
    }
    res.status(200).json(list);
  } else {
    res.status(401).json('You are not allowed!');
  }
});

module.exports = router;
