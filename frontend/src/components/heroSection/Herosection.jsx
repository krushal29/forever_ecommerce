import "../heroSection/heroSection.css";
import hero from "../../assets/hero.png";

const Herosection = () => {
  return (
    <div className="hero">
      <div className="hero1">
        <div className="heroLeft">
          <div className="firstLine">
            <p className="line"></p>
            <p className="padd">OUR BESTSELLERS</p>
          </div>
          <h1>Latest Arrivals</h1>
          <div className="lastLine">
            <p className="padd1">SHOP NOW</p>
            <p className="line"></p>
          </div>
        </div>
        <div className="rightLogo">
          <img src={hero} alt="" width="50%" />
        </div>
      </div>
    </div>
  );
};

export default Herosection;
