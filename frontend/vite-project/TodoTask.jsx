
import React, { useEffect, useState } from "react";
import "./todo-task.css";

const TodoTask = () => {
  console.log("1");

  // fetch - wider (default with JS)
  // axios - popular (better but cost in terms of space)

  const [todos, setTodos] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deletedId, setDeletedId] = useState(null);

  const handleGetTodos = () => {
    fetch("http://localhost:3000/get-todos")
      .then((res) => res.json())
      .then((data) => {
        console.log("1", data);
        setTodos(data);
      });
  };

  // async function handleGetTodos() {
  //   const res = await fetch("http://localhost:3000/get-todos");
  //   const data = await res.json();
  //   setTodos(data);
  //   console.log(data);
  // }

  useEffect(() => {
    console.log(3);
    handleGetTodos();
  }, []);

  console.log({ todos });
  // setTodos(3)

  function handleDeleteTask(todo) {
    setDeleteLoading(true);
    setDeletedId(todo.id);
    // submit api call
    const payload = {
      id: todo.id,
    };
    fetch("http://localhost:3000/delete-todo", {
      method: "DELETE",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data.success) {
          setDeleteError("");
          setDeletedId(null);
          handleGetTodos();
        } else {
          setDeleteError(data.message);
        }
      })
      .catch((err) => {
        console.log({ err });
        setDeleteError("Something went wrong. Please try again");
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  }
  

  // function editTask(todo) {
  //   navigate("/add-task", {
  //     state: todo,
  //   });
  // }

  return (
    <div className="todo-task">
      {console.log("2")}

      <div className="todo-task-header">
        <div className="todo-task-title">Todos</div>

        <span className="todo-count">
          {todos?.data?.length || 0} pending
        </span>
      </div>

      <ul className="todo-list">
        {todos?.data?.map((todo) => {
          return (
            <li className="todo-item" key={todo.id}>
              <div className="todo-content">
                <div className="todo-name">{todo.name}</div>
                <div className="todo-description">
                  {todo.description}
                </div>
              </div>

              <div className="todo-actions">
                <button className="icon-btn edit"  onClick={() => handleUpdateTask(todo)}>
                  Edit
                </button>

                <button
                  className="icon-btn delete"
                  onClick={() => handleDeleteTask(todo)}
                  disabled={deleteLoading}
                >
                  {todo.id === deletedId && deleteLoading
                    ? "Deleting"
                    : "Delete"}
                </button>
              </div>

              <div>
                {todo.id === deletedId && deleteError
                  ? deleteError
                  : ""}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoTask;