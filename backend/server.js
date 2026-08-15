
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const tasks = [
  {
    name: "Learn React first",
    id: 1,
  },
  {
    name: "Learn Node.js",
    id: 2,
  },
  {
    name: "Learn React pro",
    id: 3,
  },
];

// GET
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST
app.post("/tasks", (req, res) => {
  const task = {
    name: req.body.name,
    id: tasks.length + 1,
  };

  tasks.push(task);

  res.json(task);
});

// DELETE
app.delete("/tasks", (req, res) => {
  const id = Number(req.body.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask[0],
  });
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

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