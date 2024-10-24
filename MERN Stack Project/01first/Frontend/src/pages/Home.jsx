import React from 'react';
import Header from '../components/Header';
import '../App.css'; // Use the new theme styles

function Home() {
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome to Task Management System</h1>
          <p className="welcome-text">Manage tasks, assign responsibilities, and boost productivity!</p>
        </div>

        <div className="roles-section">
          <div className="role-card">
            <h3>Admin</h3>
            <p>Oversee managers, assign tasks, and manage the entire workflow.</p>
          </div>

          <div className="role-card">
            <h3>Manager</h3>
            <p>Organize employees, assign tasks, and ensure smooth operations.</p>
          </div>

          <div className="role-card">
            <h3>Employee</h3>
            <p>Complete tasks and contribute to project success efficiently.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
