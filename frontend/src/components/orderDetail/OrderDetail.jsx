import "../orderDetail/OrderDetail.css";
import payment from "../../../public/paymentMode.png";
// import razorpay from "../../../public/razorpay_logo-DrY6yMWi.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../../App";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const OrderDetail = () => {
  const [FirstName, SetFirstName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Street, SetStreet] = useState("");
  const [City, SetCity] = useState("");
  const [State, SetState] = useState("");
  const [Zipcode, SetZipCode] = useState();
  const [Country, SetCountry] = useState("");
  const [phone, SetPhone] = useState();
  const [paymentMode, SetpaymentMode] = useState("");
  const [count, setCount] = useState([]);
  const [detail, setdetail] = useState([]);
  const [finalBill, setFinalBill] = useState(0);
  const [loading, Setloading] = useState(false);

  const notify=(err)=>toast.error(err);


  // console.log("payment",paymentMode);
  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      const userId = await axios.get(`${backendurl}/api/product/getcart`);
      const data1 = userId.data.cartData;
      setCount(data1);
      const detail1 = await axios.post(
        `${backendurl}/api/product/addcart1`,
        data1
      );
      setdetail(detail1.data);
      // console.log("count",count);
      // console.log("detail",detail);

      let bill = [];
      for (let cou in count) {
        // console.log(count1[cou]);
        for (let det in detail) {
          // console.log(detail1[det]);
          if (count[cou]._id === detail[det]._id) {
            bill.push(detail[det].ProductPrice);
          }
        }
      }
      // console.log("bill", bill);
      let total = 0;
      for (let key in count) {
        // console.log(count1[key].count, bill[key]);
        let totalcouter = count[key].count * bill[key];
        total += totalcouter;
      }
      setFinalBill(total);
    };
    data();
  }, [detail, count]);
  const DELIVERYPost = async (e) => {
    e.preventDefault();
    if(!LastName||!FirstName||!Email||!Street||!City||!State||!Zipcode||!Country||!phone){
     return notify("Please fill in all required fields.")
    }
    if(!paymentMode) return notify("Please Enter One PaymentMode");
    Setloading(true);
    const userId = await axios.get(`${backendurl}/api/product/getcart`);
    const id = userId.data._id;

    const obj = {
      UserId: id,
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Street: Street,
      City: City,
      State: State,
      ZipCode: Zipcode,
      Country: Country,
      Phone: phone,
      bill: finalBill,
      paymentMethod: paymentMode,
      payment: false,
      cartDetail: userId.data.cartData,
    };

    if (paymentMode == "COD") {
      await axios.post(`${backendurl}/api/delivery/adddata`, obj);
      // console.log("dtaa",respone.data);
    } else if (paymentMode == "stripe") {
      const respone = await axios.post(
        `${backendurl}/api/delivery/addStripe`,
        obj
      );
      console.log("response", respone.data.success);
      if (respone.data.success) {
        const { session_url } = respone.data;
        window.location.replace(session_url);
      } else {
        toast.error(respone.data.message);
      }
    }

    const deleterespone = await axios.post(
      `${backendurl}/api/delivery/deleteData`,
      { id }
    );
    if (deleterespone.data.message) {
      Setloading(false);
      navigate("/cart");
    }
  };
  // console.log(FirstName,LastName,Email,Street,City,State,Zipcode,Country,phone);

  return (
    <div className="order1">
      <div className="order2">
        <div className="userDetail">
          <div className="orderhanding">
            <h2>
              <span>DELIVERY</span> INFORMATION
            </h2>
            <p className="line"></p>
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
            <p className="line"></p>
          </div>
          <div className="bill">
            <p>Subtotal</p>
            <p>$ {finalBill}.00</p>
          </div>
          <div className="ShippingFee">
            <p>Shipping Fee</p>
            <p>$ 10.00</p>
          </div>
          <div className="totalcharge">
            <p>Total</p>
            <p>$ {finalBill + 10}.00</p>
          </div>
          <div className="paymentMethodHeading">
            <h3>
              <span>PAYMENT </span>METHOD
            </h3>
            <p className="line"></p>
          </div>
          <div className="allpayment">
            <div className="stripe">
              <input required
                type="radio"
                value="stripe"
                name="payment"
                onChange={(e) => SetpaymentMode(e.target.value)}
              />
              <img src={payment} alt="" />
            </div>
            {/* <div className="razorpay">
              <input
                type="radio"
                value="razorpay"
                name="payment"
                onChange={(e) => SetpaymentMode(e.target.value)}
              />
              <img src={razorpay} alt="" />
            </div> */}
            <div className="COD">
              <input  required
                type="radio"
                value="COD"
                name="payment"
                onChange={(e) => SetpaymentMode(e.target.value)}
              />
              <span>CASH ON DELIVERY</span>
            </div>
          </div>
          <div className="placebtn">
            <button type="submit" onClick={DELIVERYPost}>
              {loading ? (
                <Oval
                  color="white"
                  secondaryColor="white"
                  width={105}
                  height={17}
                />
              ) : (
                "PLACE ORDER"
              )}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default OrderDetail;
