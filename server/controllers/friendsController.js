const User = require("../models/userModel");
const mongoose = require('mongoose');


const allUsers = async (req, res) => {
    const user_id = req.user._id;

    console.log("!!!  the user_id is: " + user_id);

    try{
        //const allUsers = await User.find().exec();
        const allUsers = await User.find({_id: {$ne: user_id}}).exec();

        res.status(400).json(allUsers);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// get all the following users from the User with username: username
const getFollowing = async (req, res) => {
    const user_id = req.user._id;

    try {
        const user = await User.findOne({ _id: user_id });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log("user: " + user);
        console.log("user.following: " + user.following);
        //
        const following = user.following;

        console.log("following: " + following);

        //const following = user.following;
        const users = await User.find({ _id: { $in: following } });

        console.log("getFollowing: " + users);

        res.json(users);

        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const followUser = async (req, res) => {
    const { username, followingUserId } = req.body;
    //const username1 = req.user.username; 

    //console.log("!!!! followUser !!!! ");

    try{
        //console.log("followingUser", followingUser);
        //console.log("username", username);
        //console.log("req.body.follow.username" + req.body.follow.username);
        //console.log("req.body.follow.following" + req.body.follow.following);
        //const {follow} = req.body;
        //console.log("follow: " + follow);
                
        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $addToSet: { following: followingUserId } },
            { new: true }
        );
        
        //console.log("updatedUser: " + updatedUser);

        res.status(200).json(updatedUser);

    } catch(error) {
        console.log("Error followUser!");
        res.status(400).json({error: error.message});
    }
}

// unfollow the user (we delete the array from the following array)
const unfollowUser = async (req, res) => {
    const {username, followingUserId} = req.body;

    try {
        console.log("followingUser", followingUserId);
        console.log("username", username);

        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $pull: { following: followingUserId } },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch(error) {
        console.log("Error unfollowUser!");
        res.status(400).json({error: error.message});
    }
}

// check if the User with username: username follows the user with username: followingUser
const isFollowing = async (req, res) => {
    const { username, followingUserId } = req.body;

    //console.log("1. isFollowing: username: " + username);
    //console.log("2. isFollowing: followingUser: " + followingUser);

    try {
        // find the User with username: username
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        //return true or false
        //console.log("1. isFollowing user: " + user);

        const isFollowing = user.following.includes(followingUserId);

        //console.log(" isFollowing: " + isFollowing);

        res.status(200).json({ isFollowing: isFollowing });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = { allUsers, followUser, unfollowUser, isFollowing, getFollowing}