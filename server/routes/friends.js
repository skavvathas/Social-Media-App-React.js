const express = require("express");

const {
    allUsers, 
    followUser, 
    unfollowUser, 
    isFollowing, 
    getFollowing
} = require('../controllers/friendsController');

const requireAuth = require('../middleware/requireAuth');

// the user must be authenticated to make request
const router = express.Router();

// require auth for all routes
router.use(requireAuth);

// all the users of the app are returned
router.get("/allusers", allUsers);

// follow the user
router.post("/follow", followUser);

// unfollow the user
router.post("/unfollow", unfollowUser);

router.post("/isfollowing", isFollowing);

router.get("/getfollowing", getFollowing);


module.exports = router