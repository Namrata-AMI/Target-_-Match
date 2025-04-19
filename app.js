require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs")
const User = require("./models/user.js")

const app = express();

const routes = require("./routes/index.js");

const dbUrl = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use("/api", routes); 



const createTestUser = async () => {
    const username = 'user1';
    const password = 'pass123'; 
  
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log('User already exists');
        return;
      }
  
      // hassh the password 
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      console.log(`User ${username} created successfully!`);
    } 
    catch (error) {
      console.error('Error creating user:', error);
    }
  };
  
  createTestUser();



main()
.then((res)=>{
    console.log(res);
    console.log("db working ");
})
.catch((e)=>{
    console.log(e);
    console.log("db error");
})

async function main(){
    await mongoose.connect(dbUrl);
}

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})