import { useEffect, useState } from "react";
import "../../components/orderStatus/OrderStatus.css";
import axios from "axios";
import { backendurl } from "../../App";

const OrderStatus = () => {
  const [detail, setDetail] = useState([]);
  const [count, setCount] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deliveryResponse = await axios.get(
          `${backendurl}/api/delivery/getdata`
        );
        const deliveryData = deliveryResponse.data;
        setAllData(deliveryData);

        const productResponse = await axios.get(
          `${backendurl}/api/product/alldata`
        );
        const products = productResponse.data;

        let filteredDetails = [];
        let counts = [];

        deliveryData.forEach((order) => {
          const cartData = order.cartDetail;
          counts.push(cartData);

          cartData.forEach((cartItem) => {
            const matchingProduct = products.find(
              (product) => product._id === cartItem._id
            );
            if (matchingProduct) {
              filteredDetails.push(matchingProduct);
            }
          });
        });

        setDetail(filteredDetails);
        setCount(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect only runs once

  return (
    <div className="orderCard">
      <div className="orderCard1">
        <div className="Myorder">
          <h2>
            <span>MY </span>ORDERS
          </h2>
          <p className="line"></p>
        </div>

        {allData.map((order, orderIndex) => (
          <div key={orderIndex}>
            {order.cartDetail.map((cartItem, itemIndex) => {
              const matchedProduct = detail.find(
                (product) => product._id === cartItem._id
              );

              if (!matchedProduct) return null;

              return (
                <div key={itemIndex} className="trackCard1">
                  <div className="imgTrack1">
                    <img src={matchedProduct.images[0]} width={90} alt="" />
                  </div>
                  <div className="secondpart1">
                    <div className="secondPart">
                      <div className="name">
                        <p>{matchedProduct.ProductName}</p>
                      </div>
                      <div className="PriceQuntity">
                        <div className="price">
                          <p>${matchedProduct.ProductPrice}</p>
                        </div>
                        <div className="Quantity">
                          <p>Quantity: {cartItem.count}</p>
                        </div>
                        <div className="size">
                          <p>Size: {cartItem.BtnSize}</p>
                        </div>
                      </div>
                      <div className="date">
                        <p>
                          Date: {new Date(matchedProduct.date).toDateString()}
                        </p>
                      </div>
                      <div className="payment">
                        <p>
                          Payment:{" "}
                          {order.paymentMethod
                            ? order.paymentMethod
                            : "Not Available"}
                        </p>
                      </div>
                    </div>
                    <div className="thidPartOrderStatus">
                      <span className="greenbtn"></span>
                      <span>
                        {cartItem.trackOrder1
                          ? cartItem.trackOrder1
                          : "Order Placed"}
                      </span>
                    </div>
                  </div>
                  <div className="trackOrder">
                    <p>Track Order</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
