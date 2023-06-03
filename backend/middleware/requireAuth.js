const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({ _id }).select('_id');
        // if the request is authenticated, then add the user to the request (req.user) and call next
        //  and that will verify the appopriate function using next (means that the next function or route can be used successfully)
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }

}

module.exports = requireAuth