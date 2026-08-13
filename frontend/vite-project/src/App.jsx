import { useEffect, useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);
  const [task,setTask]= useState("");

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, []);
  
function newTaskCreated(){
  fetch("http://localhost:3000/tasks",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({name:task})
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks([...tasks,data])
        setTask("");
      });
}
  return (
    <div>
      <h1>Todo App</h1>
     <input type="text" value={task} onChange={(e)=>{setTask(e.target.value)}}/>
     <button onClick={newTaskCreated}>create</button>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <p >
         {task.name}
        </p>
      ))}
    </div>
  );
}
export default App;
