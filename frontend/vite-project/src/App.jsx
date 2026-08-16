import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/tasks", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  function newTaskCreated() {
    if (task.trim() === "") {
      return;
    }

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
        console.log("Created task:", data);

        setTasks([...tasks, data]);

        setTask("");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

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
        console.log("Deleted task:", data);

        setTasks(tasks.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function updateTask(id) {
  
    const currentTask = tasks.find((item) => {
      if (item.id === id) {
        return item;
      }
    });
    setTask(currentTask.name);
    setEditingId(id);
  }
  

  function updateExistingTask() {
    if (task.trim() === "") {
      return;
    }

    fetch(`http://localhost:3000/tasks/${editingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated task:", data);

        setTasks(tasks.map((item) => (item.id === editingId ? data : item)));

        setTask("");

        setEditingId(null);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  function cancelUpdate() {
    setTask("");
    setEditingId(null);
  }

  return (
    <div>
      <h1>Todo App</h1>

      <input
        type='text'
        value={task}
        placeholder='Enter task'
        onChange={(e) => setTask(e.target.value)}
      />

      <button
        onClick={editingId !== null ? updateExistingTask : newTaskCreated}
      >
        {editingId !== null ? "Update" : "Create"}
      </button>

      {editingId !== null && <button onClick={cancelUpdate}>Cancel</button>}

      <h2>Tasks</h2>

      {tasks.map((item) => (
        <div key={item.id} className='taskcontainer'>
          <p>{item.name}</p>

          <button className='taskdeleteBtn' onClick={() => deleteTask(item.id)}>
            Delete
          </button>

          <button className='taskupdateBtn' onClick={() => updateTask(item.id)}>
            Update
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
