import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function MyTask() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false); // Track form visibility
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: ""
  }); // New task form data

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1008/${user.role}/showTask?id=${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}` // Use Bearer token for Authorization
            }
          }
        );
        console.log(res.data.tasks);
        setTasks(res.data.tasks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [user.role, user._id, token]);

  const handleAddTask = () => {
    setShowForm(true); // Show the form when "Add Task" is clicked
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const res = await axios.put(
        `http://localhost:1008/${user.role}/addTask?id=${user._id}`,
        {
          ...newTask, // Send the new task data
          userId: user._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Add Task Successful')
      setTasks([...tasks, res.data.task]); // Add the new task to the tasks array
      setShowForm(false); // Hide the form after submission
    } catch (err) {
      alert('Not Added')
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="task-container">
        <button className="add-task-button" onClick={handleAddTask}>
          Add Task
        </button>
        {tasks.length > 0 ? (
          <table className="task-table">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Description</th>
                <th>Add Date</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.createdAt}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.isDone ? "Completed ✅" : "Not Completed ❌"}</td>
                </tr>
              ))}
              {showForm && (
                <tr>
                  <td>
                    <input
                      type="text"
                      name="title"
                      placeholder="Task Title"
                      value={newTask.title}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      placeholder="Task Description"
                      value={newTask.description}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td>
                    <input
                      type="text"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                  <button type="submit" className="submit-task-button" onClick={handleSubmit}>
                    Submit Task
                  </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <p>No tasks found.</p>
        )}
        {/* {showForm && (
          
        )} */}
      </div>
    </>
  );
}
