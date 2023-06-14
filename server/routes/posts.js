const express = require("express");

const {
    getAllPostFromAllUsers,
    getAllPostFromTheFollowingUsers,
    createPost,
    getPosts,
    getPost,
    deletePost,
    updatePost,
    getPostsByUsername,
    upLikes,
    downLikes,
    editPosts
} = require('../controllers/postController');

const requireAuth = require('../middleware/requireAuth');

// the user must be authenticated to make request
const router = express.Router();

// require auth for all routes
router.use(requireAuth);

//
router.get('/allPosts', getAllPostFromAllUsers);

//
router.get('/allFollowPosts', getAllPostFromTheFollowingUsers);

// GET all posts from a specific user
router.get('/', getPosts);

//GET a single post
router.get('/:id', getPost);

// POST a new post
router.post('/', createPost);

// DELETE a post
router.delete('/:id', deletePost);

// UPDATE a post
router.patch('/:id', updatePost);

// get the posts from a specific user, other from the currently log in
router.get('/user/:id', getPostsByUsername);

//
router.get('/uplike/:id', upLikes);

//
router.get('/downlike/:id', downLikes);

//
router.put("/edit", editPosts);


module.exports = router