const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const tasks = [
  {
    id: 1,
    name: "Learn React first",
  },
  {
    id: 2,
    name: "Learn Node.js",
  },
   {
    id: 3,
    name: "Learn React pro",
  },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
