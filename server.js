//create http server
//import express module
const exp = require("express");
const app = exp();

//add body parser
app.use(exp.json());

//test data
let usersList = [
  { id: 1, name: "ravi" },
  { id: 2, name: "vikas" },
];

//create sample rest api(req handlers- routes)
//route to get users
app.get("/users", (req, res) => {
  res.send({ message: "all users", payload: usersList });
});

//route to send one user by id
app.get("/users/:id", (req, res) => {
  //get id from url
  let idOfUrl = Number(req.params.id); //=>{ id : 20}
  //serch the in users array with ID
  let userById = usersList.find((user) => user.id === idOfUrl);
  //if user not found
  if (userById === undefined) {
    res.send({ message: "Invalid user ID" });
  }
  //if user found
  else {
    res.send({ message: "one user", payload: userById });
  }
});

//route to create user
app.post("/user", (req, res) => {
  //get new user from req
  let newUser = req.body;
  //push newUser to users array
  usersList.push(newUser);
  //send res
  res.send({ message: "New user created" });
});

//route to update user
app.put("/user", (req, res) => {
  //get modified user from req
  let modifiedUser = req.body;
  //find index of user in usersList with modified user id
  let index = usersList.findIndex((user) => user.id === modifiedUser.id);
  //if user not found
  if (index === -1) {
    res.send({ message: "User not found" });
  } else {
    usersList[index] = modifiedUser;
    res.send({ message: "User modified" });
  }
});

//route to delete user
app.delete("/user/:id", (req, res) => {
  //get id of user to remove
  let userIfOfurl = Number(req.params.id);
  //find index of user in usersList with modified user id
  let index = usersList.findIndex((user) => user.id === userIfOfurl);
  //if user not found
  if (index === -1) {
    res.send({ message: "User not found" });
  } else {
    usersList.splice(index, 1);
    res.send({ message: "User deleted" });
  }
});

//assign port numbr to http server of express app
app.listen(4000, () => console.log("http server started on port 4000"));
