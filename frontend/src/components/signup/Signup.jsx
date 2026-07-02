import { useState } from "react";
import "../signup/Signup.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendurl } from "../../App";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Login1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showName, SetShowName] = useState(false);
  const [showEmail, SetShowEmail] = useState(false);
  const [showPassword, SetShowPassword] = useState(false);
  const [loading, Setloading] = useState(false);

  const notify = (err) => toast.error(err);

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    name == "" ? SetShowName(true) : SetShowName(false);
    email == "" ? SetShowEmail(true) : SetShowEmail(false);
    password == "" ? SetShowPassword(true) : SetShowPassword(false);

    if (!name || !email || !password) return;
    try {
      Setloading(true);
      // console.log(name, email, password);
      const Response = await axios.post(`${backendurl}/api/user/signup`, {
        name,
        email,
        password,
      });
      // console.log(Response);

      if (!Response.data.message) {
        notify(Response.data.data);
        Setloading(false);
      } else {
        Setloading(false);
        navigate("/login");
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <div className="login margin1">
      <div className="login1">
        <div className="loginLine">
          <h2>Sign Up</h2>
          <p className="line"></p>
        </div>
        <form action="" onSubmit={onSubmitHandle}>
          <div className="inputdetail">
            <div className="name">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {showName && <p className="Error">*Please Enter Name</p>}
            </div>
            <div className="Email">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {showEmail && <p className="Error">*Please Enter Email</p>}
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {showPassword && <p className="Error">*Please Enter Password</p>}
            </div>
            <div className="Createaccount">
              <div className="Forgot">
                <p>Forgot your password?</p>
              </div>
              <div className="Create">
                <p>
                  <Link to={"/login"}>Login Here</Link>
                </p>
              </div>
            </div>
            <div className="SignInBtn">
              <button>
                {loading ? (
                  <Oval
                    width={45}
                    height={15}
                    color="white"
                    secondaryColor="white"
                  />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login1;
