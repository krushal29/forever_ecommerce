import "../orderDetail/OrderDetail.css";
import payment from "../../../public/paymentMode.png";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const OrderDetail = () => {
  const { api, user, refreshCart } = useContext(AuthContext);
  const navigate = useNavigate();

  const [FirstName, SetFirstName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Street, SetStreet] = useState("");
  const [City, SetCity] = useState("");
  const [State, SetState] = useState("");
  const [Zipcode, SetZipCode] = useState("");
  const [Country, SetCountry] = useState("");
  const [phone, SetPhone] = useState("");
  const [paymentMode, SetpaymentMode] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [finalBill, setFinalBill] = useState(0);
  const [loading, Setloading] = useState(false);

  const notify = (err) => toast.error(err);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        if (!user) return;
        
        // Fetch cart items
        const resCart = await api.get(`/api/product/getcart`);
        const items = resCart.data.cartData || [];
        setCartItems(items);

        if (items.length > 0) {
          const resDetails = await api.post(`/api/product/addcart1`, items);
          setProductDetails(resDetails.data);
        }
      } catch (err) {
        console.error("Checkout data error:", err);
      }
    };
    fetchCheckoutData();
  }, [user]);

  // Recalculate bill
  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      const detail = productDetails.find((d) => d._id === item._id);
      if (detail) {
        total += (detail.ProductPrice || 0) * (item.count || 0);
      }
    });
    setFinalBill(total);
  }, [cartItems, productDetails]);

  const DELIVERYPost = async (e) => {
    e.preventDefault();

    if (!FirstName || !LastName || !Email || !Street || !City || !State || !Zipcode || !Country || !phone) {
      return notify("Please fill in all required fields.");
    }
    if (!paymentMode) {
      return notify("Please select a payment method.");
    }

    Setloading(true);

    const obj = {
      UserId: user._id,
      FirstName,
      LastName,
      Email,
      Street,
      City,
      State,
      ZipCode: Number(Zipcode),
      Country,
      Phone: Number(phone),
      bill: finalBill,
      paymentMethod: paymentMode,
      payment: false,
      cartDetail: cartItems,
    };

    try {
      if (paymentMode === "COD") {
        await api.post(`/api/delivery/adddata`, obj);
        // Clear cart in DB
        await api.post(`/api/delivery/deleteData`, { id: user._id });
        toast.success("Order placed successfully!");
        refreshCart();
        setTimeout(() => navigate("/orders"), 1500);
      } else if (paymentMode === "stripe") {
        const response = await api.post(`/api/delivery/addStripe`, obj);
        if (response.data.success) {
          window.location.replace(response.data.session_url);
        } else {
          toast.error(response.data.message || "Stripe checkout redirection failed");
          Setloading(false);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
      Setloading(false);
    }
  };

  return (
    <div className="order1">
      <div className="order2">
        <div className="userDetail">
          <div className="orderhanding">
            <h2>
              <span>DELIVERY</span> INFORMATION
            </h2>
            <span className="line"></span>
          </div>
          <div className="user">
            <div className="name">
              <input
                required
                type="text"
                placeholder="First name"
                value={FirstName}
                onChange={(e) => SetFirstName(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Last name"
                className="lastName"
                value={LastName}
                onChange={(e) => SetLastName(e.target.value)}
              />
            </div>
            <div className="email">
              <input
                required
                type="email"
                placeholder="Email address"
                value={Email}
                onChange={(e) => SetEmail(e.target.value)}
              />
            </div>
            <div className="street">
              <input
                required
                type="text"
                placeholder="Street"
                value={Street}
                onChange={(e) => SetStreet(e.target.value)}
              />
            </div>
            <div className="cityState">
              <input
                required
                type="text"
                placeholder="City"
                value={City}
                onChange={(e) => SetCity(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="State"
                className="lastName"
                value={State}
                onChange={(e) => SetState(e.target.value)}
              />
            </div>
            <div className="codeCountry">
              <input
                required
                type="number"
                placeholder="Zipcode"
                value={Zipcode}
                onChange={(e) => SetZipCode(e.target.value)}
              />
              <input
                required
                type="text"
                placeholder="Country"
                className="lastName"
                value={Country}
                onChange={(e) => SetCountry(e.target.value)}
              />
            </div>
            <div className="phone">
              <input
                required
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => SetPhone(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="paymentMethod">
          <div className="cartheading">
            <h2>
              <span>CART</span> TOTALS
            </h2>
            <span className="line"></span>
          </div>
          <div className="bill">
            <p>Subtotal</p>
            <p>₹{finalBill.toFixed(2)}</p>
          </div>
          <div className="ShippingFee">
            <p>Shipping Fee</p>
            <p>₹10.00</p>
          </div>
          <div className="totalcharge">
            <p>Total</p>
            <p>₹{(finalBill + 10).toFixed(2)}</p>
          </div>
          
          <div className="paymentMethodHeading">
            <h3>
              <span>PAYMENT </span>METHOD
            </h3>
            <span className="line"></span>
          </div>
          
          <div className="allpayment">
            <label className={`payment-option-card ${paymentMode === 'stripe' ? 'active' : ''}`}>
              <input 
                required
                type="radio"
                value="stripe"
                name="payment"
                checked={paymentMode === 'stripe'}
                onChange={(e) => SetpaymentMode(e.target.value)}
              />
              <img src={payment} alt="Stripe Payment logo" />
            </label>
            
            <label className={`payment-option-card cod-option ${paymentMode === 'COD' ? 'active' : ''}`}>
              <input 
                required
                type="radio"
                value="COD"
                name="payment"
                checked={paymentMode === 'COD'}
                onChange={(e) => SetpaymentMode(e.target.value)}
              />
              <span>CASH ON DELIVERY</span>
            </label>
          </div>
          
          <div className="placebtn">
            <button type="submit" className="btn btn-primary" onClick={DELIVERYPost} disabled={loading}>
              {loading ? (
                <Oval
                  color="white"
                  secondaryColor="white"
                  width={24}
                  height={24}
                />
              ) : (
                "PLACE ORDER"
              )}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderDetail;
