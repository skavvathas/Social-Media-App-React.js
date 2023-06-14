const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    userImage: {
        type: String,
        default: "defaultUser.png"
    },
    imageFile: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema)