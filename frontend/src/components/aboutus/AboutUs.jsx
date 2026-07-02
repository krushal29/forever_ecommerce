//css
import "../aboutus/AboutUs.css";


//img
import aboutImg from '../../assets/about_img-BAJyTXw9.png'
const AboutUs = () => {
  return (
    <>
      <div className="About">
        <h2>
          <span>ABOUT</span>US
        </h2>
        <p className="line"></p>
      </div>

      <div className="aboutUs">
        <div className="aboutUs1">
            <div className="aboutImg">
                <img src={aboutImg} alt="" />
            </div>
            <div className="aboutDetail">
                <div className="detail1">
                    <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
                </div>
                <div className="detail2">
                    <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                </div>
                <div className="mission">
                    <h3>Our Mission</h3>
                </div>
                <div className="missionP">
                    <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default AboutUs;
