//CSS
import "../footer/Footer.css";

//ALL IMGES
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer1">
          <div className="firstSide">
            <div className="FooterImg">
              <img src={logo} alt="" />
            </div>
            <div className="FooterP">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="centerSide">
            <div className="centerh3">
              <h3>COMPANY</h3>
            </div>
            <div className="centerul">
              <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
              </ul>
            </div>
          </div>
          <div className="lastSide">
            <div className="lasth3">
              <h3>GET IN TOUCH</h3>
            </div>
            <div className="lastUL">
              <ul>
                <li>+91 9409859500</li>
                <li>krushalbhadiyadra2908@gmail.com</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="Copyright">
        <p>Copyright 2024@ krushal - All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
