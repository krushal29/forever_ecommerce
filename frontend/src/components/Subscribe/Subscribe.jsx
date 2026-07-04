// CSS
import '../Subscribe/Subscribe.css';

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="Subscribe">
      <div className="Subscribe1">
        <div className="Subscribe_h3">
          <h3>Subscribe now & get 20% off</h3>
        </div>
        <div className="Subscribe_p">
          <p>Subscribe to get updates on new arrivals, special offers, and store announcements.</p>
        </div>
        <form onSubmit={handleSubmit} className="Subscribe_input">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">SUBSCRIBE</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Subscribe;