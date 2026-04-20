import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Analyze from './pages/Analyze';
import Report from './pages/Report';
import Plan from './pages/Plan';
import Profile from './pages/Profile';
import './style.css';

function App() {
  // 模拟登录状态
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/analyze" 
            element={isLoggedIn ? <Analyze /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/report/:id" 
            element={isLoggedIn ? <Report /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/plan" 
            element={isLoggedIn ? <Plan /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;