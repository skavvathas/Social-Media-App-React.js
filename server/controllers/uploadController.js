const User = require("../models/userModel");
const Post = require('../models/postModel');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + '-' + file.originalname);
    cb(null, file.originalname); // use original filename only
  }
});


const fileFilter = (req, file, cb) => {
  // Accept image files only
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
  /*if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);*/
};


// Set up multer middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });
  
//const uploadFunc = async (req, res) => {
const uploadFunc = async (req, res) => {

  if (!req.file) return res.status(400).send({ message: 'No file was uploaded' });

  // Image was uploaded successfully, so update user's imageUrl in the database
  //const imageUrl = req.file.path;
  const imageUrl = path.basename(req.file.path); // get just the filename
  //const imageUrl = req.file.path.replace(/^uploads\//, '');
  //const imageUrl = req.file.path.replace(/^uploads\\/, '').replace(/\\/g, '/');
  const userId = req.user._id;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { imageUrl: imageUrl } },
      { new: true }
    );
    return res.send({ message: "Image uploaded successfully", user: user });
  } catch (err) {
    return res.status(500).send({ message: "Error updating user's image URL" });
  }
};

const uploadFuncPost = async (req, res) => {

  if (!req.file) return res.status(400).send({ message: 'No file was uploaded' });

  const { postId } = req.params;
  
  const imageFile = path.basename(req.file.path); // Access the file name from the request body
  
  console.log("%%%% imageFile = " + imageFile);

  try {
    const user = await Post.findOneAndUpdate(
      { _id: postId },
      { $set: { imageFile: imageFile } },
      { new: true }
    );
    return res.send({ message: "Image uploaded successfully", user: user });
  } catch (err) {
    return res.status(500).send({ message: "Error updating user's image URL" });
  }
};

const getImage = async (req, res) => {
  const user_id = req.user._id;
  
  try {
    // Find user by ID
    const user = await User.findById(user_id);

    // If user is not found, send a 404 response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If user has no image, send a 404 response
    if (!user.imageUrl) {
      return res.status(404).json({ error: 'User has no image' });
    }

    // Send the image URL as a response
    res.status(200).json(user.imageUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

const getImageById = async (req, res) => {
  //const user_id = req.user._id;
  const { id } = req.params;
  
  try {
    // Find user by ID
    const user = await User.findById(id);

    // If user is not found, send a 404 response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If user has no image, send a 404 response
    if (!user.imageUrl) {
      return res.status(404).json({ error: 'User has no image' });
    }

    // Send the image URL as a response
    res.status(200).json(user.imageUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
  
module.exports = {
    uploadFunc,
    upload,
    getImage,
    getImageById,
    uploadFuncPost
};
