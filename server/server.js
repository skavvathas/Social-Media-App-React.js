require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const postsRoutes = require('./routes/posts')
const userRoutes = require("./routes/user");
const friendsRoutes = require("./routes/friends");
const uploadRoutes = require("./routes/upload");
const User = require("./models/userModel");
// express app
const app = express();
const path = require('path');

//app.use(bodyParser.urlencoded({ extended: true }));

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});


mongoose.connect("mongodb+srv://<username>:<password>@cluster0.9dsorio.mongodb.net/twitterClone", { useNewUrlParser: true });

// routes
app.use('/api/posts', postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/friends", friendsRoutes);
app.use("/api/uploaded", uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(4000, function() {
    console.log("Server started on port 4000!");
});