const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    // verify authentication
    const {authorization} = req.headers;
    // the format of the authorization header is typically Bearer tokenvalue

    if(!authorization){
        return res.status(401).json({error: "Authorization token required"});
    }

    // authorization is something like that:'Bearer drdfghj234.3dfghghrtghfghjhj.bhunutvgyuilmnbg'
    // i want to spit this string to Bearer and the drdfghj234.3dfghghrtghfghjhj.bhunutvgyuilmnbg
    // the second one is the token
    const token = authorization.split(' ')[1];

    try{
        // verify the token
        const {_id} = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({ _id }).select("id");
        //In this case, only the id field is 
        //selected to be included in the returned document.
        //This is useful in situations where we don't need to 
        //retrieve the entire user object 
        //from the database and just need to check if a user 
        //is authenticated or not.

        next();

    } catch( error ){
        // if the token cant be verified
        console.log(error);
        res.status(401).json({error: "Request is not authorized"});
    }
}

module.exports = requireAuth;
