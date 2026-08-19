
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const todos = [
  {
    name: "Learn React first",
    description:"react",
    id: 1,
  },
  {
    name: "Learn Node.js",
    description:"semester",
    id: 2,
  },
  {
    name: "Learn React pro",
    description:"for interview",
    id: 3,
  },
];

// GET
app.get("/get-todos", (req, res) => {
  res.json(todos);
});

// POST
app.post("/todos", (req, res) => {
  const task = {
    name: req.body.name,
    id: todos.length + 1,
    description: req.body.description,
  };

  todos.push(task);

  res.json(task);
});

// DELETE
app.delete("/todos", (req, res) => {
  const id = Number(req.body.id);

  const taskIndex = todos.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const deletedTask = todos.splice(taskIndex, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask[0],
  });
});

app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = todos.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.name = req.body.name;

  res.json(task);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});