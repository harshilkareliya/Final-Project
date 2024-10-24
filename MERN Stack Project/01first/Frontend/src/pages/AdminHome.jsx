import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import axios from "axios";
import '../App.css'

const AdminHome = () => {
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate();
  const [managers, setManagers] = useState([]); // State for managers
  const [employees, setEmployees] = useState([]); // State for employees

  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to login if not authenticated
    }

    // Fetch managers data
    axios
      .get("http://localhost:1008/admin/viewManagers", {
        headers: {
          Authorization: `Bearer ${token}` // Use Bearer token for Authorization
        }
      })
      .then((res) => {
        setManagers(res.data.managers); // Assuming 'managers' is the response field
      })
      .catch((err) => console.log(err));

    // Fetch employees data
    axios
      .get("http://localhost:1008/admin/viewEmployee", {
        headers: {
          Authorization: `Bearer ${token}` // Use Bearer token for Authorization
        }
      })
      .then((res) => {
        setEmployees(res.data.employee); // Assuming 'employees' is the response field
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {token && (
        <>
          <Header />
          <div className="container mt-4">
            <div className="row">
              {/* Managers Section */}
              <div className="col-md-6">
                <h2>Managers</h2>
                {managers && (
                  <ul className="list-group">
                    {managers.map((manager,i) => (
                      <li key={manager._id} className="list-group-item">
                        <strong className="me-2 pe-2" style={{borderRight : '1px solid gray'}}>{i+1}</strong>
                        <strong>{manager.name}</strong> - {manager.department}
                      </li>
                    ))}
                  </ul>
                ) 
              }
              {
                !managers[0] && (
                  <p>No managers found.</p>
                )
              }
              </div>

              {/* Employees Section */}
              <div className="col-md-6">
                <h2>Employees</h2>
                {employees && (
                  <ul className="list-group">
                    {employees.map((employee,i) => (
                      <li key={employee._id} className="list-group-item">
                        <strong className="me-2 pe-2" style={{borderRight : '1px solid gray'}}>{i+1}</strong>
                        <strong>  {employee.name}</strong> - {employee.department}
                      </li>
                    ))}
                  </ul>
                )}              
                {!employees[0] && (
                  <p>No employees found.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminHome;
