import React, { useEffect, useState } from "react";
import "./todo-task.css";

const TodoTask = () => {
  const [todos, setTodos] = useState({});

  const handleGetTodos = () => {
    fetch("http://localhost:3000/get-todos")
      .then((res) => res.json())
      .then((data) => {
        console.log("1", data);
        setTodos(data);
      });
  };

  // async function handleGetTodos() {
  //   const res = await fetch("http://localhost:8000/get-todos");
  //   const data = await res.json();
  //   setTodos(data);
  //   console.log(data);
  // }

  useEffect(() => {
    handleGetTodos();
  }, []);

  console.log({ todos });

  return (
    <div className="todo-task">
      <div className="todo-task-header">
        <div className="todo-task-title">Todos</div>

        <span className="todo-count">
          {todos.data?.length || 0} pending
        </span>
      </div>

      <ul className="todo-list">
        {todos.data?.map((todo) => {
          return (
            <li className="todo-item" key={todo.id}>
              <div className="todo-content">
                <div className="todo-name">{todo.name}</div>
                <div className="todo-description">
                  {todo.description}
                </div>
              </div>

              <div className="todo-actions">
                <button className="icon-btn edit">Edit</button>
                <button className="icon-btn delete">Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoTask;