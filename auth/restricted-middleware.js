const jwt = require("jsonwebtoken")
const secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
const token = req.headers.authorization;
jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    if(err) {
      // token is not valid or expired
      res.status(401).json({ you: 'Shall not pass!'})
    } else {
      // token is valid
      req.decodedToken = decodedToken;
      next();
    }
  })

};