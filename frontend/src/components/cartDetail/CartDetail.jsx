import { RiDeleteBin6Line } from "react-icons/ri";

//css
import "../cartDetail/CartDetail.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { backendurl } from "../../App";
import { Link } from "react-router-dom";

const CartDetail = () => {
  const [count1, setCount] = useState([]);
  const [detail1, setdetail] = useState([]);
  const [finalBill, setFinalBill] = useState(0);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(`${backendurl}/api/product/getcart`);
      const data1 = response.data.cartData;
      // console.log("data1", data1);
      if (!data1) {
        return;
      }
      setCount(data1);
      const postresponse = await axios.post(
        `${backendurl}/api/product/addcart1`,
        data1
      );
      // console.log("postre", postresponse.data);

      setdetail(postresponse.data);
    };
    data();
  }, []);

  const data1 = async (id, btn, value) => {
    // console.log(id, value);

    await axios.post(`${backendurl}/api/product/countercart`, {
      id,
      updatecount: value,
      btn1: btn,
    });
    const updatedCount = count1.map((data) => {
      if (data._id == id && data.BtnSize === btn) {
        const obj = {
          _id: id,
          count: value,
          BtnSize: btn,
        };
        return obj;
      } else {
        return data;
      }
    });
    setCount(updatedCount);

    // setCount(updatedCount);
  };
  // console.log("count", count1);
  // console.log("detail", detail1);

  const delete1 = async (id, btn) => {
    // console.log(id);
    const result = await axios.post(`${backendurl}/api/product/deleteCart`, {
      id,
      btn,
    });
    const updatecount = result.data.cartData;
    setCount(updatecount);
    const updateData = detail1.filter((data) => {
      return updatecount.some((val) => val._id == data._id);
    });
    setdetail(updateData);
  };

  useEffect(() => {
    let bill = [];
    for (let cou in count1) {
      // console.log(count1[cou]);
      for (let det in detail1) {
        // console.log(detail1[det]);
        if (count1[cou]._id === detail1[det]._id) {
          bill.push(detail1[det].ProductPrice);
        }
      }
    }
    console.log("bill", bill);
    let total = 0;
    for (let key in count1) {
      // console.log(count1[key].count, bill[key]);
      let totalcouter = count1[key].count * bill[key];
      total += totalcouter;
    }
    setFinalBill(total);
  }, [detail1, count1]);

  if (detail1.length === 0 || count1.length === 0) {
    return <div> </div>; // Show loading message while data is being fetched
  }

  return (
    <>
      <div className="cartDetail">
        <div className="cartDetail1">
          <div className="yourcart">
            <h2>
              <span>YOUR</span> CART
            </h2>
            <p className="line"></p>
          </div>

          {count1.map((data, index) => {
            const databtn = detail1.find((value) => value._id === data._id);

            // console.log("btn",databtn);
            return (
              <div key={index} className="cartitem">
                <div className="img">
                  <img src={databtn.images[0]} alt="" />
                </div>
                <div className="itemdetail">
                  <h4>{databtn.ProductName}</h4>
                  <div className="priceDetail">
                    <div className="priceSize">
                      <div className="price">
                        <p>${databtn.ProductPrice}</p>
                      </div>
                      <div className="size">
                        <p>{data.BtnSize}</p>
                      </div>
                    </div>
                    <div className="count">
                      <input
                        type="number"
                        onChange={(e) =>
                          data1(
                            databtn._id,
                            data.BtnSize,
                            Number(e.target.value)
                          )
                        }
                        value={data.count || 0}
                      />
                    </div>
                    <div className="delete">
                      <RiDeleteBin6Line
                        style={{ fontSize: "20px" }}
                        onClick={() => delete1(data._id, data.BtnSize)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="total">
        <div className="total1">
          <div className="total3">
            <div className="totalfirst">
              <h2>
                <span>CART</span> TOTALS
              </h2>
              <p className="line"></p>
            </div>
            <div className="SubTotal">
              <p>Subtotal</p>
              <p>$ {finalBill}</p>
            </div>
            <div className="Shipping">
              <p>Shipping Fee</p>
              <p>$ 10.00</p>
            </div>
            <div className="total2">
              <h4>Total</h4>
              <h4>$ {finalBill + 10.0}</h4>
            </div>
            <div className="checkoutbtn">
              <Link to={"/place-order"}>
                <button>PROCEED TO CHECKOUT</button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
