import { useEffect, useState } from "react";
import axios from "axios";
import "../orderitems/Order.css";
import { backendurl } from "../../../App";

const Order = () => {
  const [obj, setObj] = useState([]);
  const [status1, setStatus] = useState("Order Placed");
  const [id, setId] = useState("");
  const [productId, setProductId] = useState("");
  const [matchBtn, setMatchBtb] = useState("");
  const [product, setProduct] = useState([]);
  // console.log("status", status1);

  useEffect(() => {
    const order = async () => {
      const response = await axios.get(`${backendurl}/api/delivery/getAllData`);
      // console.log(response.data);
      setObj(response.data);
      const productData = await axios.get(`${backendurl}/api/product/alldata`);
      setProduct(productData.data);
      // console.log("product", product);
    };
    order();
  }, []);

  useEffect(() => {
    const status = async () => {
      const updateData = await axios.post(
        `${backendurl}/api/delivery/updateStatus1`,
        { status: status1, userId: id, productId: productId, btnSize: matchBtn }
      );

      setObj(updateData.data);
    };
    status();
  }, [status1]);
  console.log(obj);
  

  return (
    <div className="AdminOrder">
      <h3>Order page</h3>
      {obj.map((data, index) => {
        const datadetail = data.cartDetail;
        // console.log("detail", datadetail);
        return (
          <div key={index} className="detailordr1">
            {datadetail.map((value, ind) => {
              console.log("value", value);
              const filterData = product.find(
                (findData) => findData._id === value._id
              );
              // console.log("filterdata", filterData);

              return (
                <div key={ind} className="detailorder">
                  <div className="orderImage">
                    <img
                      src={filterData ? filterData.images[0] : ""}
                      alt={data.name}
                      width={90}
                    />
                  </div>
                  <div className="adreesDetail">
                    <div className="Productname">
                      <p>{filterData ? filterData.ProductName : ""}</p>
                    </div>
                    <div className="userName">
                      <p>
                        {data.FirstName} {data.LastName}
                      </p>
                    </div>
                    <div className="address">
                      <p>{data.Street},</p>
                      <p>{`${data.City}, ${data.State}, ${data.Country}, ${data.ZipCode}`}</p>
                    </div>
                  </div>
                  <div className="pamentDetail">
                    <div className="itemsDetail">
                      <p>Items: {value.count}</p>
                    </div>
                    <div className="Methodpayment">
                      <p>Method: {data.paymentMethod}</p>
                      <p>Payment: {data.paymentMethod=="stripe"?"Payment Done":"Pending"}</p>
                      {/* <p>Date: {data.Date}</p> */}
                    </div>
                  </div>
                  <div className="price">
                    <p>${filterData ? filterData.ProductPrice : ""}</p>
                  </div>
                  <div className="orederSatus">
                    <select
                      name="status"
                      id={`status-${index}`} value={value?value.trackOrder1:"Order Placed"}
                      onChange={(e) => {
                        setProductId(value ? value._id : "");
                        setMatchBtb(value ? value.BtnSize : "");
                        setId(data ? data._id : "");
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Out of delivery">Out of Delivery</option>
                      <option value="Packing">Packing</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Order;
