const express = require('express');
const cors = require('cors');
const router = express.Router();

// enable cross-origin middleware
router.use(cors());
// constroller functions
const {signupUser, loginUser} = require('../controllers/userController');

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

var app = express();
app.use(cors());
app.get('/test', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
  

module.exports = router;