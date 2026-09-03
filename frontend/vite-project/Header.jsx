
// import { useNavigate, useLocation } from "react-router";

// function Header() {
//   let Navigate = useNavigate();
//   let location = useLocation();
//   return (
//     <div className='header'>
//       <div className='header-items'>
//         <button
//           onClick={() => Navigate("/add-task")}
//           className={location.pathname.includes("/add-task") ? "active" : ""}
//         >
//           {" "}
//           Task
//         </button>
//         <button
//           onClick={() => Navigate("/todo-task")}
//           className={location.pathname.includes("/todo-task") ? "active" : ""}
//         >
//           {" "}
//           Todos{" "}
//         </button>
//         <button
//           onClick={() => Navigate("/completed-task")}
//           className={
//             location.pathname.includes("/completed-task") ? "active" : ""
//           }
//         >
//           Done
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Header;


import {useLocation, useNavigate} from "react-router";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className='header'>
      <div className='header-items'>
        <button onClick={()=>navigate("/task")} className={location.pathname.includes("/task") ? "active" : ""}> Task </button>
        <button onClick={()=>navigate("/todos")} className={location.pathname.includes("/todos") ? "active" : ""}> Todos </button>
        <button onClick={()=>navigate("/done")} className={location.pathname.includes("/done") ? "active" : ""}> Done </button>
      </div>
    </div>
  );
}

export default Header;
