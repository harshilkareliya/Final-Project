import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("admin");
  const [isForgotPassword, setIsForgotPassword] = useState(false); // For showing forgot password form
  const [isOtpSent, setIsOtpSent] = useState(false); // For showing OTP form
  const [otp, setOtp] = useState(""); // OTP state
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`http://localhost:1008/${userRole}/login`, { email, password })
        .then((res) => {
          if (res.data.token) {
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch(
              setCredentials({ token: res.data.token, user: res.data.user })
            );
            navigate("/home"); // Redirect to home on successful login
            window.location.reload();
          } else {
            alert("Wrong Email or Password");
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(
        `Error While Logging http://localhost:1008/${userRole}/login`
      );
      console.log(err);
    }
  };

  // Handle Forgot Password Email
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:1008/${userRole}/forgotPassword`, {
        email
      },{withCredentials : true});
      alert("OTP has been sent to your email.");
      setIsOtpSent(true); // Show OTP form after success
    } catch (err) {
      console.log("Error while sending OTP:", err);
    }
  };

  // Handle Password Reset after OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post(`http://localhost:1008/${userRole}/otpVerification`, {
        otp,
        newPassword
      }, {withCredentials : true});
      alert("Password has been reset successfully.");
      setIsOtpSent(false);
      setIsForgotPassword(false); // Go back to login form
    } catch (err) {
      console.log("Error while resetting password:", err);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-5 shadow-lg" style={{ width: "25rem" }}>
          <h2 className="text-center">
            {isForgotPassword
              ? isOtpSent
                ? "Reset Password"
                : "Forgot Password"
              : "Login"}
          </h2>

          {isForgotPassword ? (
            isOtpSent ? (
              <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-select"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Send OTP
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <a href="#" onClick={() => setIsForgotPassword(false)}>
                    Back to Login
                  </a>
                </div>
              </form>
            )
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  className="form-select"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <div className="mt-3 text-center">
                <a href="#" onClick={() => setIsForgotPassword(true)}>
                  Forgot your password?
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
