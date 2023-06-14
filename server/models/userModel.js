const mongoose = require("mongoose");
const md5 = require("md5");
// npm package used to validate email
const validator = require("validator");
const path = require('path');
const fs = require('fs');

/*const defaultImageFilePath = path.join(__dirname, '../images/userImage.png');
const defaultImageBuffer = fs.readFileSync(defaultImageFilePath);

const defaultImage = {
  data: defaultImageBuffer,
  contentType: "image/png"
};*/

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username:  {
    type: String,
    required: true,
  },
  password:  {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "defaultUser.png"
  },
  following: [{ type: String }],
});

// static register method
userSchema.statics.register = async function(firstName, lastName, email, username, password){
  
  if(!email || !password){
    throw Error("All fields must be filled!");
  }

  if(!validator.isEmail(email)){
    throw Error("Email is not valid!");
  }
  
  // if exists return not NULL then the same username is in use
  const exists = await this.findOne({username});

  if(exists){
      throw Error("Username already in use")
  }

  // hash the password
  const hash = await md5(password); 
  console.log(hash);

  const user = await this.create({firstName, lastName, email, username, password: hash})
  //const user = await this.create({firstName, lastName, email, username, md5(password)})
  console.log("Register: " + user);
  return user;
}

// Static Login method
// Find if the user is in the database, and return the user
// If is not in the database throw an error
userSchema.statics.login = async function(username, password){

  if(!username || !password){
    throw Error("All fields must be filled!");
  }

  // check if the user with this username exists
  const user = await this.findOne({username});

  // if not exist
  if(!user){
    throw Error("Incorrect username");
  }

  const hash = await md5(password);
  console.log(hash);
  console.log(user.password);

  if(user.password !== hash){
    throw Error("Incorrect password");
  }

  return user;
}

module.exports = mongoose.model("User", userSchema)