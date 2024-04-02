import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUpForm from './SignUpForm';
import './App.css';
import StudentHome from './StudentHome';
import Account from './Account';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/StudentHome" element={<StudentHome />} />
          <Route path="/SignUp" element={<SignUpForm/>} />
          <Route path="/account" element={<Account/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
