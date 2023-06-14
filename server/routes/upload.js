const express = require("express");

const {
    uploadFunc,
    upload,
    getImage,
    getImageById,
    uploadFuncPost
} = require('../controllers/uploadController');

const requireAuth = require('../middleware/requireAuth');

// the user must be authenticated to make request
const router = express.Router();

// require auth for all routes
router.use(requireAuth);

// upload the image of the user's profile
router.post('/upload-image', upload.single('image'), uploadFunc);

// upload the image of the post
router.post('/upload-image-post/:postId', upload.single('image'), uploadFuncPost);

// return the photo
router.post('/getImage', getImage); 

router.post('/getImageById/:id', getImageById); 


module.exports = router