const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    // {_id:_id}  == {_id} but {id:_id}  == {id} or {_id:_id} == {_id}   => key-value vars must be same
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' })
}
// login user
const loginUser = async (req, res) => {
    res.json({ mssg: 'login user' })
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // signup user using static function created using schema
        const user = await User.signup(email, password);

        // create a new token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    // res.json({ mssg: 'signup user' })
}

module.exports = { signupUser, loginUser }