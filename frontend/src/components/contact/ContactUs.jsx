//css
import '../contact/ContactUs.css'


//img
import contact from '../../assets/contact_img-CyOum2vk.png'




import { Link } from 'react-router-dom'
const ContactUs = () => {
  return (
   <>
   <div className="contact-us">
    <h2><span>CONTACT</span>US</h2>
    <p className='line'></p>
   </div>
    <div className="contact">
        <div className="contact1">
            <div className="contactImg">
                <img src={contact} alt="" />
            </div>
            <div className="store">
                <div className="storeh2">
                <h2>Our Store</h2>
                </div>
                <div className="storeul">
                    <ul>
                        <li>54709 Willms Station</li>
                        <li>Suite 350, Washington, USA</li>
                        <li className='TelNum'>Tel: (415) 555-0132</li>
                        <li>Email: admin@forever.com</li>
                    </ul>
                </div>
                <div className="careerh2">
                    <h2>Careers at Forever</h2>
                </div>
                <div className="careerp">
                    <p>Learn more about our teams and job openings.</p>
                </div>
                <div className="JobsBtn">
                    <button><Link>Explore Jobs</Link></button>
                </div>
            </div>
        </div>
    </div>
   </>
  )
}

export default ContactUs