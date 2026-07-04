import { Link } from "react-router-dom";
import "../footer/Footer.css";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/">
            <img src={logo} alt="Forever Logo" className="footer-logo" />
          </Link>
          <p className="footer-tagline">
            Forever brings you timeless fashion crafted with care. Quality clothing for every season, every reason.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">COMPANY</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/collection">Collection</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">GET IN TOUCH</h4>
          <ul className="footer-links">
            <li><a href="tel:+919409859500">+91 940 985 9500</a></li>
            <li><a href="mailto:admin@forever.com">admin@forever.com</a></li>
            <li><a href="#" rel="noreferrer">Instagram</a></li>
            <li><a href="#" rel="noreferrer">Facebook</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Forever — All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
