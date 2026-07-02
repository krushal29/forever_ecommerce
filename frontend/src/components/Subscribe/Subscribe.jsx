// CSS
import '../Subscribe/Subscribe.css';

const Subscribe = () => {
  return (
    <div className="Subscribe">
        <div className="Subscribe1">
            <div className="Subscribe_h3">
                <h3>Subscribe now & get 20% off</h3>
            </div>
            <div className="Subscribe_p">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="Subscribe_input">
                <input type="email" placeholder='Enter Your email' required />
                <button>SUBSCRIBE</button>
            </div>
        </div>
    </div>
  )
}

export default Subscribe