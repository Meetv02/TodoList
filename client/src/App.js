import React, { useState, useEffect } from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar';
import TodoList from './components/ToDoList';
import EditTodo from './components/EditToDo';
import CreateTodo from './components/AddToDo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/todos/')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`).then((response) => {
      console.log(response.data);
      setTodos(todos.filter((el) => el._id !== id));
    });
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <br />
        <Routes>  
        <Route path="/" exact element={<TodoList todos={todos} deleteTodo={deleteTodo} />} />
        <Route path="/edit/:id" element={<EditTodo />} />
        <Route path="/add" element={<CreateTodo/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

