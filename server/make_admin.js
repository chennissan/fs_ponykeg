#! /usr/bin/env node
require("dotenv").config();

console.log(
    'This script change user status to admin - e.g.: node make_admin <user name>');
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const User = require("./models/user");
    
  const mongoose = require("mongoose");
  const bcrypt = require('bcrypt');
  mongoose.set("strictQuery", false);
  
  const user_name = userArgs[0];
  console.log("got :", user_name);
 
  const MONGO_URI = process.env.MONGODB_URI;

  main().catch((err) => console.log(err));

   
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(MONGO_URI);
    console.log("Debug: Should be connected?");
    await makeAdmin(user_name); // another function 
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

  async function userFind(user_name) {
    const query = User.findOne({ username: user_name});
    const user = await query.exec();
    return user;
}

async function makeAdmin(user_name) {
  const user = await userFind(user_name);
  if (!user){
    console.log("cant find user");
    return;
  }
  user.is_admin = true;
  await user.save();
}


  
  
  
 
  