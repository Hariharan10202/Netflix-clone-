const JWT = require('jsonwebtoken');

const verify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    JWT.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json('Token is Invalid!');
      req.user = user;
      next();
    });
  } else {
    res.status(401).json('Unauthenticated');
  }
};

module.exports = verify;
