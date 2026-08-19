// import React from 'react'

// function AddTask() {
//   return (
//     <div>
//         <div>
//             <h2>Add Task</h2>
//             <form className='add-task-form'>
//                 <div className='form-field'>
//                     <label htmlFor="title">Title</label>
//                     <input type="text" id="title" placeholder='Enter task title' />
//                     </div>
//                     <div className='form-field'>
//                         <label htmlFor="description">Description</label>
//                         <textarea id="description" row="4" placeholder='Enter task description'></textarea>
//                                             </div>
//                                             <div>
//                                                 <button type="button" className='btn btn-secondary'> cancle </button>
//                                                 <button type="submit" className='btn btn-primary'> save task</button>
//                                             </div>
//             </form>
//         </div>
      
//     </div>
//   )
// }

// export default AddTask

import React, { useState } from "react";
import { useNavigate } from "react-router";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  function saveTask(e) {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      return;
    }

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task created:", data);

        setTitle("");
        setDescription("");

        // Go to Todo page
        navigate("/todo-task");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function cancelTask() {
    setTitle("");
    setDescription("");
  }

  return (
    <div>
      <h2>Add Task</h2>

      <form className="add-task-form" onSubmit={saveTask}>
        <div className="form-field">
          <label htmlFor="title">Title</label>

          <input
            type="text"
            id="title"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            rows="4"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={cancelTask}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;