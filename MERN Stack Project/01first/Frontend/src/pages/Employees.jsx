import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../App.css";

const Employees = () => {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    department: user.role === "admin" ? "" : user.department,
    salary: ""
  });

  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to login if not authenticated
    }
    const userDepartment = user.role === 'manager' ? user.department : null;

    axios.get(`http://localhost:1008/${user.role}/viewEmployee`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userDepartment },
      })
      .then((res) => {
        setEmployees(res.data.employee);
      })
      .catch((err) => console.log(err));
  }, [token, user, navigate]);

  const handleAddEmployee = (e) => {
    e.preventDefault();

    if (isEdit) {
      axios.put(`http://localhost:1008/${user.role}/editEmployee?id=${newEmployee._id}`, {
          name: newEmployee.name,
          email: newEmployee.email,
          department: newEmployee.department,
          salary: newEmployee.salary
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const updatedEmployees = employees.map((emp) =>
          emp._id === newEmployee._id ? res.data.employee : emp
        );
        setEmployees(updatedEmployees);
        setShowAddEmployeeForm(false);
        setIsEdit(false);
      })
      .catch((err) => console.log(err));
    } else {
      axios.post(`http://localhost:1008/${user.role}/addEmployee`, {
          name: newEmployee.name,
          email: newEmployee.email,
          password: newEmployee.password,
          department: newEmployee.department,
          salary: newEmployee.salary
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log("Employee added successfully", res.data);
        setEmployees([...employees, res.data.employee]);
        setShowAddEmployeeForm(false);
      })
      .catch((err) => console.log(err));
    }
    setShowAddEmployeeForm(false);
    setNewEmployee({
      name: "",
      email: "",
      password: "",
      department: "",
      salary: ""
    });
  };

  const handleInputChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:1008/${user.role}/deleteEmployee?id=${id}`,{withCredentials:true} ,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res);
      setEmployees(employees.filter((emp) => emp._id !== id));
    })
    .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    const employeeToEdit = employees.find((emp) => emp._id === id);
    setNewEmployee(employeeToEdit);
    setShowAddEmployeeForm(true);
    setIsEdit(true);
  };

  return (
    <>
      {token && (
        <>
          <Header />
          <div style={{ display: "flex", justifyContent: "space-between"}}>
            <h1 style={{color:"white", marginTop:"10px",marginLeft:"20px", fontSize:"40PX"}}>Employees</h1>
            <button
              className="btn btn-info me-3"
              style={{ height: "40px", marginTop: "20px" }}
              onClick={() => setShowAddEmployeeForm(true)} 
            >
              Add Employee
            </button>
          </div>

          <div className={showAddEmployeeForm ? "blur-background" : ""} style={{height:"100vh", padding:"20px"}}>
            {employees && (
              <div>
                <table className="table table-hover table-bordered"
                 id="employee">
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
                    {employees.map((e) => (
                      <tr key={e._id}>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.department}</td>
                        <td>{e.salary}</td>
                        <td>{e.createdAt}</td>
                        <td>
                          <button onClick={() => handleDelete(e._id)} className="btn btn-danger">Delete</button>
                          <button onClick={() => handleEdit(e._id)} className="btn btn-warning ms-2">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {showAddEmployeeForm && (
            <div className="employee-form-overlay">
              <div className="employee-form">
                <h2>{isEdit ? "Edit Employee" : "Add New Employee"}</h2>
                <form onSubmit={handleAddEmployee}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newEmployee.name}
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
                      value={newEmployee.email}
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
                          value={newEmployee.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <br />
                    </>
                  )}
                  {user && user.role === "admin" && (
                    <div className="form-group">
                      <label>Department</label>
                      <input
                        type="text"
                        className="form-control"
                        name="department"
                        value={newEmployee.department}
                        onChange={handleInputChange}
                        required
                      />
                      <br />
                    </div>
                  )}
                  <div className="form-group">
                    <label>Salary</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salary"
                      value={newEmployee.salary}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-success">
                    {isEdit ? "Save" : "Add Employee"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setShowAddEmployeeForm(false);
                      setIsEdit(false);
                      setNewEmployee({
                        name: "",
                        email: "",
                        password: "",
                        department: "",
                        salary: ""
                      });
                    }}
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

export default Employees;
