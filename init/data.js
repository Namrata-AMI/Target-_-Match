require("dotenv").config();


const mongoose = require('mongoose');
const Company = require("../models/company.js");

const dbUrl = process.env.MONGO_URL ;

const companiesData = [
  {
    companyName: "TechCorp",
    matchScore: 86,
    accountStatus: "Target"
  },
  {
    companyName: "BizInc",
    matchScore: 72,
    accountStatus: "Not Target"
  }
];



async function main() {

    try {
      await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("db connect");
      

      await Company.insertMany(companiesData);
      console.log("data added ...");

    } 
    catch (e) {
      console.log("db error:", e);
    } 
  
  finally {

    mongoose.connection.close();
  }
}


main();
