import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/Employee-List';
import Departmentsection from './components/Department-Section';
import LeaveTypes from './components/Leave-Types';
import LeaveManagement from './components/Leave-Management';
import Settings from './components/Settings';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/user/home';
import Leave from './components/user/leave';

function App() {
  const [adminloggedIn, setAdminLoggedIn] = useState(false);
  const [userloggedIn, setUserLoggedIn] = useState(false);
  const [username, setUserName] = useState('');

  return (
    <Router>
      <Routes>
        <Route index element={<Login setAdminLoggedIn={setAdminLoggedIn} setUserLoggedIn={setUserLoggedIn} setUserName={setUserName} />} />
        <Route path="/" element={<Layout setAdminLoggedIn={setAdminLoggedIn} setUserLoggedIn={setUserLoggedIn} adminloggedIn={adminloggedIn} userloggedIn={userloggedIn} username={username}/>}>
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="employeelist" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <EmployeeList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="departmentsection" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <Departmentsection />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="leavetypes" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <LeaveTypes />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="leavemanagement" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn}>
                <LeaveManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="settings" 
            element={
              <ProtectedRoute isAuthenticated={adminloggedIn || userloggedIn} >
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path={`home/${username}`}
            element={
              <ProtectedRoute isAuthenticated={userloggedIn}>
                <Home userid={username}/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path={`leave/${username}`}
            element={
              <ProtectedRoute isAuthenticated={userloggedIn}>
                <Leave userid={username}/>
              </ProtectedRoute>
            } 
          />
          {/* {<Route path="/" element={<Login setAdminLoggedIn={setAdminLoggedIn} setUserLoggedIn={setUserLoggedIn} />} />} */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;