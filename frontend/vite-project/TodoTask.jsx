
// import  { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import "./todo-task.css";

// const TodoTask = () => {
//   const navigate = useNavigate();
//   console.log("1");

// function handleUpdateTask(todo) {
//   navigate(`/add-task/${todo.id}`);
//   // navigate(`/taskUpdated/${todo.id}`);
// }

//   const [todos, setTodos] = useState([]);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [deleteError, setDeleteError] = useState("");
//   const [deletedId, setDeletedId] = useState(null);

//   const handleGetTodos = () => {
//     fetch("http://localhost:3000/get-todos")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("1", data);
//         setTodos(data);
//       });
//   };


//   useEffect(() => {
//     console.log(3);
//     handleGetTodos();
//   }, []);

//   console.log({ todos });
//   // setTodos(3)

//   function handleDeleteTask(todo) {
//     setDeleteLoading(true);
//     setDeletedId(todo.id);
   
//     const payload = {
//       id: todo.id,
//     };
//     fetch("http://localhost:3000/delete-todo", {
//       method: "DELETE",
//       body: JSON.stringify(payload),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log({ data });
//         if (data.success) {
//           setDeleteError("");
//           setDeletedId(null);
//           handleGetTodos();
//         } else {
//           setDeleteError(data.message);
//         }
//       })
//       .catch((err) => {
//         console.log({ err });
//         setDeleteError("Something went wrong. Please try again");
//       })
//       .finally(() => {
//         setDeleteLoading(false);
//       });
//   }
  
//   return (
//     <div className="todo-task">
//       {console.log("2")}

//       <div className="todo-task-header">
//         <div className="todo-task-title">Todos</div>

//         <span className="todo-count">
//           {todos?.data?.length || 0} pending
//         </span>
//       </div>

//       <ul className="todo-list">
//         {todos?.data?.map((todo) => {
//           return (
//             <li className="todo-item" key={todo.id}>
//               <div className="todo-content">
//                 <div className="todo-name">{todo.name}</div>
//                 <div className="todo-description">
//                   {todo.description}
//                 </div>
//               </div>

//               <div className="todo-actions">
//                 <button className="icon-btn edit"
//                   onClick={() => handleUpdateTask(todo)}>
//                   Edit
//                 </button>

//                 <button
//                   className="icon-btn delete"
//                   onClick={() => handleDeleteTask(todo)}
//                   disabled={deleteLoading}
//                 >
//                   {todo.id === deletedId && deleteLoading
//                     ? "Deleting"
//                     : "Delete"}
//                 </button>
//               </div>

//               <div>
//                 {todo.id === deletedId && deleteError
//                   ? deleteError
//                   : ""}
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default TodoTask;

import { useEffect, useState } from "react";
import "./todo-task.css";
import { useNavigate, useParams } from "react-router";

const TodoTask = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Get all tasks
  useEffect(() => {
    fetch("http://localhost:3000/get-task")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  // If id exists, get that task for updating ........"Server, give me only the task whose ID is 2."
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/get-task/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTaskTitle(data.name);
          setTaskDescription(data.description);
        });
    }
  }, [id]);

  function CreateTask(e) {
    e.preventDefault();

    const task = {
      name: taskTitle,
      description: taskDescription,
    };

    // UPDATE
    if (id) {
      fetch(`http://localhost:3000/task/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated:", data);

          setTaskTitle("");
          setTaskDescription("");

          navigate("/task");
        });

      return;
    }

    // CREATE
    fetch("http://localhost:3000/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Created:", data);

        setTaskTitle("");
        setTaskDescription("");

        navigate("/task");
      });
  }

  return (
    <div className="todo-task">
      <h3>{id ? "Update Task" : "Create Task"}</h3>

      <form>
        <input
          placeholder="Enter task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <input
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <button onClick={CreateTask}>
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default TodoTask;