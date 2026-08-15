

import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // GET method
  useEffect(() => {
    fetch("http://localhost:3000/tasks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);

  // POST method
  function newTaskCreated() {
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTasks([...tasks, data]);

        setTask("");
      });
  }

  // DELETE method
  function deleteTask(id) {
    fetch("http://localhost:3000/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTasks(tasks.filter((task) => task.id !== id));
      });
  } // ← deleteTask ends here


  // UPDATE method
  function updateTask(id) {
    // Find the task that we want to update
    const currentTask = tasks.find((task) => task.id === id);

    // Ask user for new task name
    const newName = prompt(
      "Enter new task name:",
      currentTask.name
    );

    // If user presses Cancel
    if (newName === null) {
      return;
    }

    // Send PATCH request to server
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Update frontend state
        setTasks(
          tasks.map((task) =>
            task.id === id ? data : task
          )
        );
      });
  }


  return (
    <div>
      <h1>Todo App</h1>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={newTaskCreated}>
        Create
      </button>

      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div key={task.id} className="taskcontainer">
          <p>{task.name}</p>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>

          <button onClick={() => updateTask(task.id)}>
            Update
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;