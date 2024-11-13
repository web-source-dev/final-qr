import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRForm from './Components/QRForm';
import ViewData from './Components/ViewData';
import UserDetails from './Components/UserDetails';

const App = () => {

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <button className='theme-changer-btn' onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <Routes>
        <Route path="/" element={<QRForm />} />
        <Route path="/data" element={<ViewData />} />
        <Route path="/user/:userId" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
