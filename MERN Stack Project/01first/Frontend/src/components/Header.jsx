// src/components/Header.jsx
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user) {
    navigate("/");
  }

  function handleLogout() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)"
      }}
    >
      <div className="container-fluid">
        <Link to="/home" className="nav-link active me-4">
          <h3 style={{ color: "#fff" }}>ABC</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/home"
                className="nav-link active"
                style={{ color: "#fff" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-link"
                style={{ color: "#fff" }}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/myTask"
                className="nav-link"
                style={{ color: "#fff" }}
              >
                My Task
              </Link>
            </li>
            {user.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    to="/managers"
                    className="nav-link"
                    style={{ color: "#fff" }}
                  >
                    Managers
                  </Link>
                </li>
              </>
            )}
            {(user.role === "admin" || user.role === "manager") && (
              <li className="nav-item">
                <Link
                  to="/employees"
                  className="nav-link"
                  style={{ color: "#fff" }}
                >
                  Employees
                </Link>
              </li>
            )}
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={handleLogout}
                style={{ color: "#fff" }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
