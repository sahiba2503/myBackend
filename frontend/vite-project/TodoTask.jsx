
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./todo-task.css";

const TodoTask = () => {
  const navigate = useNavigate();
  console.log("1");

function handleUpdateTask(todo) {
  navigate(`/add-task/${todo.id}`);
}

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
                <button className="icon-btn edit"
                  onClick={() => handleUpdateTask(todo)}>
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