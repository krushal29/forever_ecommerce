import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { CgProfile, CgMenuRight, CgClose } from "react-icons/cg";
import "../navbar/Navbar.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ border1 }) => {
  const { user, logout, cartCount } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar-container" style={border1}>
      <div className="navbar-main">
        {/* Logo */}
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="Forever Brand Logo" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
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
              <Link to={"/contact"}>CONTACT</Link>
            </li>
          </ul>
        </div>

        {/* Action Icons */}
        <div className="nav-actions">
          <div className="search-icon icon-btn">
            <Link to={"/collection"} aria-label="Search Catalog">
              <CiSearch />
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="profile-menu-container">
            <button className="profile-btn icon-btn" aria-label="User Profile Dropdown">
              <CgProfile />
            </button>
            <div className="profile-dropdown">
              <ul>
                {user ? (
                  <>
                    <li className="dropdown-user-info">
                      <span>Hi, {user.name}</span>
                    </li>
                    {user.IsAdmin === "admin" && (
                      <li>
                        <Link to={"/admin-dashboard"}>Admin Panel</Link>
                      </li>
                    )}
                    <li>
                      <Link to={"/orders"}>My Orders</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="logout-btn-link">Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to={"/login"}>Login</Link>
                    </li>
                    <li>
                      <Link to={"/signup"}>Create Account</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="cart-icon-container">
            <Link to={"/cart"} aria-label="Shopping Cart">
              <IoBagOutline />
              {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-menu-toggle icon-btn" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Drawer"
          >
            <CgMenuRight />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Slide-in Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="drawer-content">
          <div className="drawer-header">
            <img src={logo} alt="Logo" className="drawer-logo" />
            <button 
              className="close-drawer-btn icon-btn" 
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Drawer"
            >
              <CgClose />
            </button>
          </div>
          <ul className="drawer-links">
            <li>
              <Link to={"/"} onClick={() => setMobileMenuOpen(false)}>HOME</Link>
            </li>
            <li>
              <Link to={"/collection"} onClick={() => setMobileMenuOpen(false)}>COLLECTION</Link>
            </li>
            <li>
              <Link to={"/about"} onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
            </li>
            <li>
              <Link to={"/contact"} onClick={() => setMobileMenuOpen(false)}>CONTACT</Link>
            </li>
            {user ? (
              <>
                <li className="drawer-divider"></li>
                {user.IsAdmin === "admin" && (
                  <li>
                    <Link to={"/admin-dashboard"} onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
                  </li>
                )}
                <li>
                  <Link to={"/orders"} onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
                </li>
                <li>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="logout-btn-link">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="drawer-divider"></li>
                <li>
                  <Link to={"/login"} onClick={() => setMobileMenuOpen(false)}>Login</Link>
                </li>
                <li>
                  <Link to={"/signup"} onClick={() => setMobileMenuOpen(false)}>Create Account</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
