import { useEffect, useState } from "react";
import logo from "../../../assets/adminlogo.png";

import "../navbar/Navbar.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendurl } from "../../../App";
import { use } from "react";

const Navbar = () => {
  // const [logout, setlogout] = useState(false);
  // useEffect(() => {
  //   const data = async () => {
  //     const res = await axios.get(`${backendurl}/api/user/adminlogout`);
  //     console.log(res.data);
  //     if(!res.data==false){
  //       navigate('/admin-login');
  //     }
      
  //   };
  //   data();
  // }, []);
  const navigate=useNavigate();
  useEffect(()=>{
    const data=async()=>{
      const res = await axios.get(`${backendurl}/api/user/adminlogin`);
      console.log("rew",res);
      if(!res.data){
        navigate('/admin-login');
      }
    }
    data();
  },[navigate])
  const handlelogin=async()=>{
    const res = await axios.get(`${backendurl}/api/user/adminlogout`);
    console.log("rew");
    navigate('/admin-login');
    
  }
  return (
    <div className="adminNavbar">
      <div className="adminNavbar1">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="LogoutBtn">
          <button>
            <Link onClick={handlelogin}>Logout</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
