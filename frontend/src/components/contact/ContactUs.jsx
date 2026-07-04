import { Link } from 'react-router-dom';
import '../contact/ContactUs.css';
import contact from '../../assets/contact_img-CyOum2vk.png';

const ContactUs = () => {
  return (
    <div className="contact-page-wrapper">
      {/* Section Header */}
      <div className="section-header contact-section-header">
        <div className="section-title">
          <h2><span>CONTACT</span> US</h2>
          <span className="line"></span>
        </div>
      </div>

      {/* Contact Content */}
      <div className="contact-content">
        <div className="contact-image">
          <img src={contact} alt="Contact Forever Store" />
        </div>

        <div className="contact-info">
          <div className="contact-info-block">
            <h3>Our Store</h3>
            <address>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
              <p className="contact-tel">Tel: (415) 555‑0132</p>
              <p>Email: <a href="mailto:admin@forever.com">admin@forever.com</a></p>
            </address>
          </div>

          <div className="contact-info-block">
            <h3>Careers at Forever</h3>
            <p className="contact-careers-desc">
              Learn more about our teams and job openings. Join us in building the future of fashion.
            </p>
            <Link to="/about" className="btn btn-outline" style={{ display: 'inline-block', marginTop: '16px' }}>
              Explore Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;