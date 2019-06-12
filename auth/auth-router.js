const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({message: error});
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        // req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({message: '500 failure on logging in'});
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id, // what the token is describing
    username: user.username
  };

  // const secret = secrets; // moved to env and secrets.js to isolate secrets
  const options = {
    expiresIn: '1h'
  };

    return jwt.sign(payload, secrets.jwtSecret, options); // 3 things, paylod/ data, secret, options
}

  router.get('/logout', (req, res) => {
    if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Ther was an error loging out'});
      }
      res.end();
    });
  } else {
    res.end();
  }
  })

module.exports = router;
