//create http server
//import express module
const exp = require("express");
const app = exp();

//import MongoClient
const { MongoClient } = require("mongodb");
//Create MongoClient object
let mClient = new MongoClient("mongodb://127.0.0.1:27017");

//connect to mongodb server
mClient
  .connect()
  .then(() => {
    console.log("Db connection success");
    //assign port numbr to http server of express app
    app.listen(4000, () => console.log("http server started on port 4000"));
  })
  .catch((err) => console.log("Error in DB connection", err));


  

//import userApp express object
const userApp = require("./APIs/userApi");
const productApp = require("./APIs/productsApi");

//if path starts with /user-api, forward req to userApp
app.use("/user-api", userApp);
//if path starts with /user-api, forward req to userApp
app.use("/product-api", productApp);
