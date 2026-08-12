const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const tasks = [
  {
    
    name: "Learn React first",
  },
  {
   
    name: "Learn Node.js",
  },
   {
   
    name: "Learn React pro",
  },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});
app.post("/tasks", (req, res) => {
 console.log(req.body);
 const task = {
  name:req.body.name
 };
 tasks.push(task);
 res.json(task);

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
