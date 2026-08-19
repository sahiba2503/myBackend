import React from 'react'
import {Route,Routes,Navigate} from "react-router";
import AddTask from './AddTask';
import TodoTask from './TodoTask';
import CompletedTask from './CompletedTask';
function MainContainer() {
  return (
    <div>
      <h1>MainContainer</h1>     
        <Routes>
            <Route path="/add-task" element={<AddTask />}></Route>
            <Route index element = {<Navigate to = "/add-task"/>}></Route>
            <Route path="/todo-task" element={<TodoTask />}></Route>
            <Route path="/completed-task" element={<CompletedTask/>}></Route>
            <Route path ="/*" element ={<Navigate to="/add-task"/>}></Route>
        </Routes>
      </div>
  
  )
}

export default MainContainer
