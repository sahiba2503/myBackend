

// export default AddTask;
import  {  useState } from "react";

import { useNavigate } from "react-router";
const AddTask = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleAddTask(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);



    if (!title || !description) {
      setError("Title and Description are required to add a task");
      setLoading(false);
    } else {
      if (title.length < 3 || description.length < 3) {
        setError(
          "Title and Description should contain at least 3 characters."
        );
        setLoading(false);
      } else {
        // submit api call
        const payload = {
          description,
          name: title,
        };

        setTimeout(() => {
          fetch("http://localhost:3000/add-todo", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log({ data });

              if (data.success) {
                // clear the form
                setTitle("");
                setDescription("");
                navigate("/todo-task");
              } else {
                setError(data.message);
              }
            })
            .catch((err) => {
              console.log({ err });
              setError("Something went wrong. Please try again");
            })
            .finally(() => {
              setLoading(false);
            });
        }, 3000);
      }
    }
  }

  // success ? redirect to todo-task : display error

  // useEffect(() => {
  //   if(location.todo.id) {
  //     setTitle(title)
  //     setDescription(desc)
  //     setEditId(id)
  //   }
  // }, [location.pathname])

  return (
    <div className="add-task">
      <div className="add-task-card">
        <div className="add-task-title">Add Task</div>

        <form className="add-task-form">
          <div className="form-field">
            <label htmlFor="title">Title</label>

            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(event) => {
                setError("");
                setTitle(event.target.value);
              }}
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              rows="4"
              placeholder="Enter task description"
              value={description}
              onChange={(event) => {
                setError("");
                setDescription(event.target.value);
              }}
            />
          </div>

          {error ? error : ""}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleAddTask}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;