import "../aboutus/AboutUs.css";
import aboutImg from '../../assets/about_img-BAJyTXw9.png';

const AboutUs = () => {
  return (
    <div className="about-page-wrapper">
      {/* Section Header */}
      <div className="section-header about-section-header">
        <div className="section-title">
          <h2><span>ABOUT</span> US</h2>
          <span className="line"></span>
        </div>
      </div>

      {/* About Content */}
      <div className="about-content">
        <div className="about-image">
          <img src={aboutImg} alt="About Forever Brand" />
        </div>
        <div className="about-text">
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>
          <div className="about-mission">
            <h3>Our Mission</h3>
            <p>
              Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
