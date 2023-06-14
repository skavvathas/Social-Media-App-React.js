const mongoose = require('mongoose');
const Post = require('../models/postModel');
const User = require("../models/userModel");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Set up multer storage and file filter
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadPosts/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // use original filename only
    }
});

const fileFilter = (req, file, cb) => {
    // Accept image files only
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

// Set up multer middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });



const getAllPostFromAllUsers = async (req, res) => {
    const allPosts = await Post.find().exec();

    res.status(200).json(allPosts);
}

// get the post only from the users that you follw (is used in the /home)
const getAllPostFromTheFollowingUsers = async (req, res) => {
    const user_id = req.user._id;
   // const followingUsers1 = req.user.following;

    console.log("hello, user_id : " + user_id);
   // console.log("follow: " + followingUsers1);

    try {
        const followingUsers = await User.findOne({ _id: user_id })
          .select('following')
          .lean(); // get the following array of the current user
    
        const followingId = followingUsers.following; // extract the usernames from the following array
    
        console.log("followingId: " + followingId);
        const posts = await Post.find({ user_id: { $in: followingId } }).exec(); // find posts that have a username that matches any of the usernames in the following array
        console.log("!@ posts: " + posts);
        res.status(200).json(posts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

// get all posts from a specific user
const getPosts = async (req, res) => {
    // from the request we have the user _id
    // const {user_id} = req.body;
    const user_id = req.user._id;

    const posts = await Post.find({user_id}).sort({createdAt: -1});
    // sort({createdAt: -1}) is a method that sorts the matching documents in descending order based on their createdAt field.
    // find({user_id}) is a method that searches the Post collection for documents that have a user_id field matching the provided value.

    res.status(200).json(posts);
}

// get the posts from a specific user, other from the currently log in
const getPostsByUsername = async (req, res) => {
    // from the request we have the user _id
    // const {user_id} = req.body;
    const { id } = req.params;

    console.log("hello dawg ");


    try {
        const posts = await Post.find({ username: id });
        
        console.log("id posts -> " + posts)

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// get a single post
const getPost = async (req, res) => {
    const { id } = req.params;
    // extracts the id parameter from the request object. 
    // This assumes that the route is defined with a URL parameter :id.
    // Maybe we can do it as well: const user_id = req.user._id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'});
    }

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({error: 'No such post'});
    }

    res.status(200).json(post)
}

// create new post
const createPost = async (req, res) => {
    // take the new post from the body
    const {id, post, username, userImage} = req.body
    //const {id, post, username, imageFile} = req.body

    // initializes an empty array to hold the names of empty fields.
    let emptyFields = []; 
  
    if(!post) {
      emptyFields.push('post')
    }
    
    // checks if there are any empty fields. 
    // If there are any empty fields, a 400 Bad Request response is sent back to 
    // the client with an error message and a list of empty fields.
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
  
    // add post to db
    try {
        // take the user_id
        const user_id = id;

        //create the new post
        const newPost = await Post.create({post, user_id, username, userImage});

        res.status(200).json(newPost);
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}



/*const createPost = async (req, res) => {
    // Take the new post and imageFile from the body
    const { id, post, username } = req.body;
    let imageFile = '';

    console.log(" We are in the createPost, " + id + " " + post + " ");
  
    // Initializes an empty array to hold the names of empty fields.
    let emptyFields = [];
  
    if (!post) {
      emptyFields.push('post');
    }
  
    // Checks if there are any empty fields.
    // If there are any empty fields, a 400 Bad Request response is sent back to
    // the client with an error message and a list of empty fields.
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }
  
    try {
      // Take the user_id
      const user_id = id;
  
      upload.single('imageFile')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          // Handle Multer errors
          return res.status(400).json({ error: err.message });
        } else if (err) {
          // Handle other errors
          return res.status(400).json({ error: 'Error uploading file' });
        }
  
        if (req.file) {
          // If file was uploaded using multipart/form-data, update the imageFile value
          imageFile = req.file.filename;
        }
  
        const newPostData = { post, user_id, username, imageFile };
  
        const newPost = await Post.create(newPostData);
        res.status(200).json(newPost);
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};*/

// delete a post
const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'});
    }

    const post = await Post.findOneAndDelete({_id: id});

    if (!post) {
        return res.status(400).json({error: 'No such post'});
    }

    res.status(200).json(post);
}

// update a post
const updatePost = async (req, res) => {}


// increase the number of likes
const upLikes = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findOne({ _id: id });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        res.json(updatedPost.likes);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// Decrease the number of likes
const downLikes = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: -1 } },
      { new: true }
    );

    res.json(updatedPost.likes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const editPosts = async (req, res) => {
    const {username, prevUsername} = req.body;
    const user_id = req.user._id;

    console.log("WE ARE IN editUser: ");

    try {
        const posts = await Post.updateMany(
            { user_id: user_id },
            { $set: { username: username } }
        );

        console.log("posts are + " + posts);
    
        res.status(200).json({ message: "Posts updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
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
}