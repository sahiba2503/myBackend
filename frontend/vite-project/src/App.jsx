import { useEffect, useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);
  function newTaskCreated(){
   
    fetch("http://localhost:3000/tasks",
      {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name:"definitionrevision"})
  });

  }
  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" />
      <button onClick={newTaskCreated}>create</button>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <p key={task.id}>
          {task.id} - {task.name}
        </p>
      ))}
    </div>
  );
}
export default App;
