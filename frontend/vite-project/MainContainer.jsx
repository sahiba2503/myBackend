

// import AddTask from "./AddTask";
// import TodoTask from "./TodoTask";
// import CompletedTask from "./CompletedTask";
// import { Routes, Route, Navigate } from "react-router";


// const MainContainer = () => {

//   return (
//     <div className="main-container">
//       <Routes>
//         <Route index element={<Navigate to="/add-task" />} />
//         <Route path="/add-task" element={<AddTask />} />
//         <Route path="/add-task/:id" element={<AddTask />} />
//         <Route path="/todo-task" element={<TodoTask />} />
//         <Route
//           path="/completed-task"
//           element={<CompletedTask />}
//         />
//         <Route path="*" element={<Navigate to="/add-task" />} />
//       </Routes>
//     </div>
//   );
// };

// export default MainContainer;

import {Routes,Route , Navigate} from "react-router";
import TodoTask from "./TodoTask";
import AddTask from "./AddTask";
import CompletedTask from "./CompletedTask";

const MainContainer = () => {

  return (
    <div className="main-container">
     <Routes>
       <Route path="/" element={ <Navigate to="task"/>}></Route>
       <Route path="/task" element={ <TodoTask/>}></Route>
      <Route path="/todos" element={ <AddTask/>}></Route>
      <Route path="/done" element={ <CompletedTask/>}></Route>
     </Routes>
    </div>
  );
};

export default MainContainer;