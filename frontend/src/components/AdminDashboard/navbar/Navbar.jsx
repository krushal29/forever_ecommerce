import { useContext } from "react";
import logo from "../../../assets/adminlogo.png";
import "../navbar/Navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlelogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  return (
    <div className="adminNavbar">
      <div className="adminNavbar1">
        <div className="logo">
          <img src={logo} alt="Forever Admin Panel" />
        </div>
        <div className="LogoutBtn">
          <button onClick={handlelogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
