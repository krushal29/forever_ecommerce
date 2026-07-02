import "../Login/Login1.css";

//toast
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { backendurl } from "../../App";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Login1 = () => {
  // const notifywarn = (val) => toast.warn(val);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmail, SetShowEmail] = useState(false);
  const [showPassword, SetShowPassword] = useState(false);
  const [loading, SetLoading] = useState(false);

  const notify = (err) => toast.error(err);

  const opensignup = () => {
    navigate("/signup");
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    email == "" ? SetShowEmail(true) : SetShowEmail(false);
    password == "" ? SetShowPassword(true) : SetShowPassword(false);
    if (!email || !password) return;
    try {
      SetLoading(true);
      // console.log(email, password);
      const Response = await axios.post(`${backendurl}/api/user/login`, {
        email,
        password,
      });
      // console.log(Response);
      if (!Response.data.message) {
        notify(Response.data.data);
        SetLoading(false);
      } else {
        SetLoading(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="login">
      <div className="login1">
        <div className="loginLine">
          <h2>Login</h2>
          <p className="line"></p>
        </div>
        <form action="" onSubmit={onSubmitHandle}>
          <div className="inputdetail">
            <div className="Email">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />{" "}
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
                  <Link to={"/signup"} onClick={opensignup}>
                    Create account
                  </Link>
                </p>
              </div>
            </div>
            <div className="SignInBtn">
              <button>
                {loading ? (
                  <Oval
                    width={37}
                    height={15}
                    color="white"
                    secondaryColor="white"
                  />
                ) : (
                  "Sign In"
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
