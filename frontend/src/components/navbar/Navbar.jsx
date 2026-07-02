import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "../navbar/Navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../../App";

const Navbar = ({ border1 }) => {
  const [isLoginout, setLogin] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const data1 = async () => {
      const res = await axios.get(`${backendurl}/api/user/userlogin`);
      // if (!res.data) {
      //   navigate("/login");
      // }
    };
    data1();
  }, []);
  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await axios.get(`${backendurl}/api/product/getcart`);
      const countdata=result.data.cartData;
      let sum=0;
      
      countdata.map((data)=>sum+=data.count);
      console.log(sum);
      setCount(sum)
    },0); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const data = async () => {
      try {
        if (isLoginout) {
          console.log("enter");
          navigate("/login");
          await axios.post(`${backendurl}/api/user/Logout`, { isLoginout });
        }
        // else{
        //   navigate('/login');
        // }
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, [isLoginout]);

  return (
    <nav>
      <div className="navbar">
        <div className="navbar1" style={border1}>
          <div className="logo">
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="detail">
            <ul>
              <li>
                <Link to={"/"}>HOME</Link>
              </li>
              <li>
                <Link to={"/collection"}>COLLECTION</Link>
              </li>
              <li>
                <Link to={"/about"}>ABOUT</Link>
              </li>
              <li>
                <Link to={"/Contact"}>CONTACT</Link>
              </li>
            </ul>
          </div>
          <div className="allimg">
            <div className="search padding1">
              <Link to={"/collection"}>
                <CiSearch style={{ color: "black", fontWeight: "bolder" }} />
              </Link>
            </div>
            <div className="profile padding1">
              <Link to={"/login"}>
                <CgProfile style={{ color: "black" }} />
              </Link>
              <div className="hover">
                <ul>
                  <li>
                    <Link>My Profile</Link>
                  </li>
                  <li>
                    <Link to={'/Orders'}>Orders</Link>
                  </li>
                  <li>
                    <Link onClick={() => setLogin(!isLoginout)}>Logout</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="cart padding1">
              <Link to={"/cart"}>
                <IoBagOutline style={{ color: "black" }} />
                <p className="count1">{count}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
