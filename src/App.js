import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbarv';
import AddTaskPage from './pages/AddTaskPage';
import TaskListPage from './pages/TaskListPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
function App() {
        const isAuth = localStorage.getItem('isAuthenticated') === 'true';
        console.log(isAuth)
    return (
        <Router>
              {isAuth && <Navbar />}
            <Routes>
                <Route path="/" element={<AddTaskPage />} />
                <Route path="/tasks" element={<TaskListPage />} />
                <Route path="/SignIn" element={<SignInPage />} />
                  <Route path="/SignUp" element={<SignUpPage />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
}

export default App;
