const router = require('express').Router();
const User = require('../Models/User');
const crypto = require('crypto-js');
const JWT = require('jsonwebtoken');

//REGISTER

router.post('/register', async (req, res) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: crypto.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json('Wrong password or username');

    const bytes = crypto.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalText = bytes.toString(crypto.enc.Utf8);

    originalText !== req.body.password && res.status(401).json('Wrong password or username');

    const accessToken = JWT.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
      expiresIn: '5d',
    });

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
