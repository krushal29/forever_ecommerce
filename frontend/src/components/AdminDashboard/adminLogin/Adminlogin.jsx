import { useState } from "react";
import "../adminLogin/Adminlogin.css";
import { backendurl } from "../../../App";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  console.log(isLogin);

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();

      const Response = await axios.post(backendurl + "/api/user/admin", {
        email,
        password,
        isLogin,
      });
      console.log(Response);
      if (Response.data.isLogin) {
        navigate("/admin-dashboard");
      } else {
        alert("Invalid Email or Password");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="adminlogin">
      <div className="adminlogin1">
        <div className="adminlogin2">
          <div className="loginh2">
            <h2>Admin Panel</h2>
          </div>
          <form action="" onSubmit={onSubmitHandle}>
            <div className="data">
              <div className="adminEmail">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  placeholder="your@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="adminpassword">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter Your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="adminBtn">
                <button onClick={() => setIsLogin(!isLogin)}>Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
