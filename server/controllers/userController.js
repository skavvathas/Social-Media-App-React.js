const User = require("../models/userModel");
const Post = require('../models/postModel');
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    // 3 arguments
    // const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
    const token = jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
    return token;

    
}

//login user
const loginUser = async (req, res) => {
    const {username, password} = req.body;

    try{
        // register function in models/userModel
        const user = await User.login(username, password);
        console.log("This is my id " + user._id);

        // create token
        const token = createToken(user._id);

        res.status(200).json({user, token});
    } catch(error){
        res.status(400).json({error: error.message})
    }

}


// sign up
const registerUser = async (req, res) => {
    const {firstName, lastName, email, username, password} = req.body;

    try{
        // register function in models/userModel
        console.log("Hey " + username + lastName + email + username);
        const user = await User.register(firstName, lastName, email, username, password)
        console.log("This is my id " + user._id);

        // create token
        const token = createToken(user._id);

        console.log("Hey this is my token" + token);

        res.status(200).json({user, token});
    } catch(error){
        res.status(400).json({error: error.message})
    }

}

const allUsers = async (req, res) => {
    try{
        const allUsers = await User.find().exec();

        res.status(400).json(allUsers);
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const editUser = async (req, res) => {
    const {firstName, lastName, username, prevUsername} = req.body;

    console.log("WE ARE IN editUser: ");

    try {
        const user = await User.findOneAndUpdate(
            { username: prevUsername }, // find user by previous username
            { firstName, lastName, username }, // update user fields with new values
            { new: true } // return the updated user
        );
        
        // create token  !!!!!!!!!!!

        /*const posts = await Post.updateMany(
            { username: prevUsername },
            { $set: { username: username } },
            { new: true }
        );*/
        
        const token = req.headers.authorization.split(' ')[1];

        console.log("token from editUser: " + token);

        res.status(200).json({user, token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserByUsername = async (req, res) => {
    const {username} = req.body;
    console.log("username" + username);

    try {
      // Assuming you are using a User model with a findByUsername method
      const user = await User.findOne({ username });
      res.status(200).json({user});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {loginUser, registerUser, allUsers, editUser, getUserByUsername}