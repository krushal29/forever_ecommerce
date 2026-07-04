import { useState, useContext } from "react";
import "../adminLogin/Adminlogin.css";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, backendUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.isLogin && response.data.token) {
        login(response.data.token, response.data.data);
        toast.success("Welcome to Admin Panel!");
        setTimeout(() => navigate("/admin-dashboard"), 1200);
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminlogin">
      <div className="adminlogin1">
        <div className="adminlogin2">
          <div className="loginh2">
            <h2>Admin Panel</h2>
          </div>
          <form onSubmit={onSubmitHandle}>
            <div className="data">
              <div className="adminEmail">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="adminpassword">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="adminBtn">
                <button type="submit" disabled={loading}>
                  {loading ? "Verifying..." : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Adminlogin;
