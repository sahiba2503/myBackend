

// const express = require("express");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// let todos_list = [
//   {
//     id: 1,
//     name: "Learn React first",
//     description: "react",
//   },
//   {
//     id: 2,
//     name: "Learn Node.js",
//     description: "semester",
//   },
//   {
//     id: 3,
//     name: "Learn React pro",
//     description: "for interview",
//   },
// ];

// // GET

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>");
// });


// app.get("/get-todos", (req, res) => {
//   res.json({
//     success: true,
//     data: todos_list,
//   });
// });
// //POST - Add Todo
// app.get("/get-todo/:id", (req, res) => {
//    const id = Number(req.params.id); 
//    const todo = todos_list.find((todo) => todo.id === id);
//     if (!todo) {
//        return res.json({
//          success: false,
//           message: "Todo not found", });
//        }
//        res.json({ success: true, data: todo, }); });

// app.post("/add-todo", (req, res) => {
//   console.log({body:req.body,headers:req.headers});
//   if(req.body.name && req.body.description){
//     todos_list.push({
      
//     id: Date.now(),
//     name: req.body.name,
//     description: req.body.description  
//     });
//     res.status(201).json({success:true,message:"task added successfully"})
//   }
//   else{
//     res
//     .status(409)
//     .json({success:false,message:"name or description is missing"});
//   }
// });
  

// app.patch("/edit-todo/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const { name, description } = req.body;

//   const todo = todos_list.find((todo) => todo.id === id);
// //todo is an object.
//   if (!todo) {
//     return res.status(404).json({
//       success: false,
//       message: "Task not found",
//     });
//   }

//    todo.name = name;
//   todo.description = description;

//   res.json({
//     success: true,
//     message: "Task updated successfully",
//     data: todo,
//   });
// });

// app.delete("/delete-todo", (req, res) => {
//   console.log({
//     body:req.body,
//     headers:req.headers,
//   });

// const id = Number(req.body.id);
// const taskIndex = todos_list.findIndex( 
//   (todo) => todo.id === id );


//   //  todo doesn't exist
//   if (taskIndex === -1) {
//     return res.status(404).json({
//       success: false,
//       message: "Task not found",
//     });
//   }

//   // Delete todo
//   const deletedTask = todos_list.splice(taskIndex, 1);

//   // Send response
//   res.json({
//     success: true,
//     message: "Task deleted successfully",
//     data: deletedTask[0],
//   });

// });

// // PATCH - Edit Todo
// app.patch("/edit-todo/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const { name, description } = req.body;

//   // Find todo
//   const todo = todos_list.find((todo) => todo.id === id);

//   // If todo doesn't exist
//   if (!todo) {
//     return res.status(404).json({
//       success: false,
//       message: "Task not found",
//     });
//   }

//   // Update values
//   if (name) {
//     todo.name = name;
//   }

//   if (description) {
//     todo.description = description;
//   }

//   // Send response
//   res.json({
//     success: true,
//     message: "Task updated successfully",
//     data: todo,
//   });
// });

// // START SERVER
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });




const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
app.get("/get-task",(req,res)=>{
  res.json(todos_list);
})
  app.post("/create-task",(req,res)=>{
    const task = {
      name:req.body.name,
      description:req.body.description,
      id:todos_list.length + 1,
    }
    todos_list.push(task);
    res.json(todos_list);
  })

app.delete("/delete-task",(req,res)=>{
  id = Number(req.body.key);
  todos_list = todos_list.filter((item)=>{
    return (item.id !== id)
  })
 
   res.json(todos_list);
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



