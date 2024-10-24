import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../App.css";
import Home from "./Home";

const Managers = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [manager, setManager] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // New error state

  const [isEdit, setIsEdit] = useState(false);
  const [showAddManagerForm, setShowAddManagerForm] = useState(false); // State to control form visibility

  const [newManager, setNewManager] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    salary: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const managerResponse = await axios.get(
          "http://localhost:1008/admin/viewManagers",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setManager(managerResponse.data.managers);

        const employeeResponse = await axios.get(
          "http://localhost:1008/admin/viewEmployee",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setEmployee(employeeResponse.data.employee);
      } catch (err) {
        setError("Failed to load data. Please try again later."); // Set error state
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchData();
  }, []);

  // Function to handle form submission
  const handleAddManager = (e) => {
    e.preventDefault();

    if (isEdit) {
      axios
        .put(
          `http://localhost:1008/admin/editManager?id=${newManager._id}`,
          {
            name: newManager.name,
            email: newManager.email,
            department: newManager.department,
            salary: newManager.salary
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log("Manager updated successfully", res.data.manager);
          const updatedManagers = manager.map((m) =>
            m._id === newManager._id ? res.data.manager : m
          );
          setManager(updatedManagers); // Update the list with the edited manager
          setShowAddManagerForm(false); // Close the form
          setIsEdit(false); // Reset to add mode
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          "http://localhost:1008/admin/addManager",
          {
            name: newManager.name,
            email: newManager.email,
            password: newManager.password,
            department: newManager.department,
            salary: newManager.salary
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log("Manager added successfully", res.data);
          setManager([...manager, res.data.manager]); // Add the new manager to the list
          setShowAddManagerForm(false); // Close the form
        })
        .catch((err) => console.log(err));
    }
    setShowAddManagerForm(false);
    setNewManager({
      name: "",
      email: "",
      password: "",
      department: "",
      salary: ""
    });
  };

  const handleInputChange = (e) => {
    setNewManager({
      ...newManager,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:1008/admin/deleteManager?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Use Bearer token for Authorization
        }
      })
      .then((res) => {
        console.log(res);
        setManager(manager.filter((m) => m._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    const managerToEdit = manager.find((m) => m._id === id);
    setNewManager(managerToEdit);
    setShowAddManagerForm(true);
    setIsEdit(true);
  };

  const handleViewEmployees = (department, managerId) => {
    setSelectedEmployees((prev) => {
      // If the same managerId is clicked, remove it (toggle behavior)
      if (prev[managerId]) {
        const updated = { ...prev };
        delete updated[managerId]; // Remove the currently toggled employees
        return updated;
      } else {
        // Otherwise, show employees for the clicked manager
        const filteredEmployees = employee.filter(
          (e) => e.department === department
        );
        return {
          ...prev,
          [managerId]: filteredEmployees // Add new manager's employees
        };
      }
    });
  };

  return (
    <>
      {token && (
        <>
          <Header />
          <div style={{ display: "flex", justifyContent: "space-between", backgroundColor:"rgba(255, 255, 255, 0.2)" }}>
            <h1 style={{color:"white", marginTop:"10px",marginLeft:"20px", fontSize:"40PX"}}>Managers</h1>
            <button
              className="btn btn-info me-3"
              style={{ height: "40px", marginTop: "20px" }}
              onClick={() => setShowAddManagerForm(true)} // Show form on click
            >
              Add Manager
            </button>
          </div>

          <div
            className={showAddManagerForm ? "blur-background" : "" } style={{height:"100vh", padding:"20px"}}// Apply blur class conditionally
          >
            {manager && (
              <div>
                <table id="table" className="table table-hover " style={{color : 'red'}}>
                  <thead className="thead-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Salary</th>
                      <th>Join Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {manager &&
                      manager.map((e) => (
                        <React.Fragment key={e._id}>
                          <tr>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.department}</td>
                            <td>{e.salary}</td>
                            <td>{e.createdAt}</td>
                            <td >
                              <button
                                onClick={() => handleDelete(e._id)}
                                className="btn btn-danger text-white"
                              >
                                Delete
                              </button>{" "}
                              <button
                                onClick={() => handleEdit(e._id)}
                                className="btn btn-warning text-white"
                              >
                                Edit
                              </button>{" "}
                              <button
                                onClick={() => handleTask(e._id)}
                                className="btn btn-outline-dark text-white"
                              >
                                Add Task
                              </button>{" "}
                              <button
                                onClick={() =>
                                  handleViewEmployees(e.department, e._id)
                                }
                                className="btn btn-outline-dark text-white"
                              >
                                {selectedEmployees[e._id]
                                  ? "Hide Employees"
                                  : "View Employees"}
                              </button>{" "}
                            </td>
                          </tr>

                          {/* Show employees under the manager */}
                          <tr
                            className={`employee-row ${
                              selectedEmployees[e._id] ? "show" : ""
                            }`}
                          >
                            <td colSpan="6">
                              {selectedEmployees[e._id] && (
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Employee Name</th>
                                      <th>Email</th>
                                      <th>Department</th>
                                      <th>Salary</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedEmployees[e._id].map((emp) => (
                                      <tr key={emp._id}>
                                        <td>{emp.name}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.department}</td>
                                        <td>{emp.salary}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Form for adding a new manager */}
          {showAddManagerForm && (
            <div className="manager-form-overlay">
              <div className="manager-form">
                <h2>{isEdit ? "Edit Manager" : "Add New Manager"}</h2>
                <form onSubmit={handleAddManager}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newManager.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={newManager.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  {!isEdit && (
                    <>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="text"
                          className="form-control"
                          name="password"
                          value={newManager.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <br />
                    </>
                  )}
                  <div className="form-group">
                    <label>Department</label>
                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      value={newManager.department}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Salary</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salary"
                      value={newManager.salary}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-success">
                    {isEdit ? "Save" : "Add Manager"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setShowAddManagerForm(false);
                      setNewManager({
                        name: "",
                        email: "",
                        password: "",
                        department: "",
                        salary: ""
                      });
                      setIsEdit(false);
                    }} // Hide form on cancel
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Managers;
