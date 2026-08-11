import { useEffect, useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);
  // So for your simple GET request, you don't need to write headers or body.
  // But fetch() CAN have headers and body  For example, POST:
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);
  return (
    <div>
      <h1>Todo App</h1>
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
