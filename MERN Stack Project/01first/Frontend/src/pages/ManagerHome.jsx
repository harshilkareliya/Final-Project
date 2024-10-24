import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import '../App.css'

const ManagerHome = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [managers, setManagers] = useState([]); // State for managers
  const [employees, setEmployees] = useState([]); // State for employees

  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to login if not authenticated
    }

    // Fetch managers data
    // axios
    //   .get("http://localhost:1008/manager/viewManagers", {
    //     headers: {
    //       Authorization: `Bearer ${token}` // Use Bearer token for Authorization
    //     }
    //   })
    //   .then((res) => {
    //     setManagers(res.data.managers); // Assuming 'managers' is the response field
    //   })
    //   .catch((err) => console.log(err));

    // Fetch employees data
    axios
      .get("http://localhost:1008/manager/viewEmployee", {
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

export default ManagerHome;
