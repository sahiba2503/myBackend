

const express = require("express");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Todo data
let todos_list = [
  {
    id: 1,
    name: "Learn React first",
    description: "react",
  },
  {
    id: 2,
    name: "Learn Node.js",
    description: "semester",
  },
  {
    id: 3,
    name: "Learn React pro",
    description: "for interview",
  },
];



// GET


app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});


app.get("/get-todos", (req, res) => {
  res.json({
    success: true,
    data: todos_list,
  });
});



// POST - Add Todo


app.post("/add-todo", (req, res) => {
  const { name, description } = req.body;

  // Check if name and description exist
  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Name and description are required",
    });
  }

  // Check minimum length
  if (name.length < 3 || description.length < 3) {
    return res.status(400).json({
      success: false,
      message:
        "Name and description should contain at least 3 characters",
    });
  }

  // Create new todo
  const newTodo = {
    id: Date.now(),
    name: name,
    description: description,
  };

  // Add todo to array
  todos_list.push(newTodo);

  // Send response
  res.status(201).json({
    success: true,
    message: "Task added successfully",
    data: newTodo,
  });
});



// DELETE - Delete Todo


app.delete("/delete-todo", (req, res) => {
  const id = Number(req.body.id);

  // Find todo
  const taskIndex = todos_list.findIndex((todo) => todo.id === id);

  // If todo doesn't exist
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  // Delete todo
  const deletedTask = todos_list.splice(taskIndex, 1);

  // Send response
  res.json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask[0],
  });
});



// PATCH - Edit Todo


app.patch("/edit-todo/:id", (req, res) => {
  const id = Number(req.params.id);

  const { name, description } = req.body;

  // Find todo
  const todo = todos_list.find((todo) => todo.id === id);

  // If todo doesn't exist
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  // Update values
  if (name) {
    todo.name = name;
  }

  if (description) {
    todo.description = description;
  }

  // Send response
  res.json({
    success: true,
    message: "Task updated successfully",
    data: todo,
  });
});



// START SERVER


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});