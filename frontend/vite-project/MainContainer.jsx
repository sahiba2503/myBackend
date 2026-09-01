

import AddTask from "./AddTask";
import TodoTask from "./TodoTask";
import CompletedTask from "./CompletedTask";
import { Routes, Route, Navigate } from "react-router";


const MainContainer = () => {

  return (
    <div className="main-container">
      <Routes>
        <Route index element={<Navigate to="/add-task" />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/todo-task" element={<TodoTask />} />
        <Route
          path="/completed-task"
          element={<CompletedTask />}
        />
        <Route path="*" element={<Navigate to="/add-task" />} />
      </Routes>
    </div>
  );
};

export default MainContainer;