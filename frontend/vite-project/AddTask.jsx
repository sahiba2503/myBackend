
// import  {  useState ,useEffect} from "react";
// import { useParams } from "react-router";
// import { useNavigate } from "react-router";
// const AddTask = () => {
//   const navigate = useNavigate();



//   const { id } = useParams();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

// // GET SINGLE TODO WHEN EDITING 
// useEffect(() => {
//    if (id) {
//      fetch(`http://localhost:3000/get-todo/${id}`) 
//     .then((res) => res.json())
//    .then((data) => {
//      console.log("Single todo:", data);
//      if (data.success) {
//        setTitle(data.data.name);
//        setDescription(data.data.description); 
//       }
//         else {
//            setError(data.message);
//            }
//        })
//        .catch((err) => {
//          console.log(err); 
//          setError("Something went wrong. Please try again");
//          });
//          }
//          }, [id]);
         

//   function handleAddTask(event) {
//     event.preventDefault();

//     if (loading) return;

//     setLoading(true);


//     if (!title || !description) {
//       setError("Title and Description are required to add a task");
//       setLoading(false);
//     } else {
//       if (title.length < 3 || description.length < 3) {
//         setError(
//           "Title and Description should contain at least 3 characters."
//         );
//         setLoading(false);
//       } else {
//         // submit api call
//         const payload = {
//           description,
//           name: title,
//         };

//         setTimeout(() => {
//           fetch("http://localhost:3000/add-todo", {
//             method: "POST",
//             body: JSON.stringify(payload),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           })
//             .then((res) => res.json())
//             .then((data) => {
//               console.log({ data });

//               if (data.success) {
              
//                 setTitle("");
//                 setDescription("");
//                 navigate("/todo-task");
//               } else {
//                 setError(data.message);
//               }
//             })
//             .catch((err) => {
//               console.log({ err });
//               setError("Something went wrong. Please try again");
//             })
//             .finally(() => {
//               setLoading(false);
//             });
//         }, 3000);

//       }
//     }
//  if (id) {
//   fetch(`http://localhost:3000/edit-todo/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify({
//       name: title,
//       description: description,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.success) {
//         navigate("/todo-task");
//       } else {
//         setError(data.message);
//       }
//     })
//     .catch(() => {
//       setError("Something went wrong. Please try again");
//     })
//     .finally(() => {
//       setLoading(false);
//     });

//   return;
// }

//  }
//   return (
//     <div className="add-task">
//       <div className="add-task-card">
//         <h2 className="add-task-title">Add Task</h2>

//         <form className="add-task-form">
//           <div className="form-field">
//             <label htmlFor="title">Task Title : </label>

//             <input
//               id="title"
//               type="text"
//               placeholder="Enter task title"
//               value={title}
//               onChange={(event) => {
//                 setError("");
//                 setTitle(event.target.value);
//               }}
//             />
//           </div>

//           <div className="form-field">
//             <label htmlFor="description">Description : </label>

//             <textarea
//               id="description"
//               rows="4"
//               placeholder="Enter task description"
//               value={description}
//               onChange={(event) => {
//                 setError("");
//                 setDescription(event.target.value);
//               }}
//             />
//           </div>

//           {error ? error : ""}

//           <div className="form-actions">
//             <button type="button" className="btn btn-secondary">
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="btn btn-primary"
//               onClick={handleAddTask}
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save Task"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTask;

import { useState ,useEffect} from "react";
import { useLocation ,useNavigate } from "react-router";
const AddTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks,setTasks] = useState([]);
  const [deleteId,setDeleteId] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    fetch("http://localhost:3000/get-task")
    .then((response)=>response.json())
    .then((data)=>setTasks(data))
  },[]);


function DeletedTask(id) {
    setLoading(true);
    setDeleteId(id);

  setTimeout(()=>{
fetch("http://localhost:3000/delete-task", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      key: id,
    })
  })
    .then((res) => res.json())
    .then((data) => {console.log(data)
            setTasks(data);
            setLoading(false);
            setDeleteId(0);
        } )
    .catch((error) =>{
      console.log(error)
       setLoading(false);
        setDeleteId(0);
    } );
  },2000);
  
}
function UpdateTask(id){
    navigate(`/task/${id}`);

}

  return (
    <div className="add-task">
      <h3>hello Todos component</h3>
      <div >{tasks.map((item)=>{
        return <div key={item.id}> <h4>{item.name}</h4>
        <b>{item.description}</b>
         <button onClick={()=>DeletedTask(item.id)}  disabled={item.id === deleteId && loading} >   {item.id === deleteId && loading ? "Deleting"  : "Delete"} </button>
        
          <button onClick={()=>UpdateTask(item.id)} > update</button>
        </div>
       
      })}</div>
    </div>
  );
};

export default AddTask;