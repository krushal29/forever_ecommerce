import { Link } from "react-router-dom";
import "../heroSection/heroSection.css";
import hero from "../../assets/hero.png";

const Herosection = () => {
  return (
    <div className="hero-container">
      <div className="hero-main">
        {/* Left Side: Content */}
        <div className="hero-left">
          <div className="hero-tagline">
            <span className="hero-line"></span>
            <span className="tag-text">OUR BESTSELLERS</span>
          </div>
          <h1 className="hero-title">Latest Arrivals</h1>
          <Link to="/collection" className="hero-cta">
            <span className="cta-text">SHOP NOW</span>
            <span className="hero-line"></span>
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className="hero-right">
          <img src={hero} alt="Latest Fashion Trends Hero Image" />
        </div>
      </div>
    </div>
  );
};

export default Herosection;
