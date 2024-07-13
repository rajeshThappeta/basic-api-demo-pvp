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
  .then((connectionObj) => {   
    //connect to a database(fsd)
    const fsddb=connectionObj.db('fsd');
    //connect to a collection
    const usersCollection=fsddb.collection('users')
    //share collection obj tp APIS
    app.set('usersCollection',usersCollection);

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

//handling invalid path
app.use('*',(req,res,next)=>{
  console.log(req.path)
  res.send({message:`Invalid path`})
})

//error handling middleware
app.use((err,req,res,next)=>{
  res.send({message:"error occurred",errorMessage:err.message})
})