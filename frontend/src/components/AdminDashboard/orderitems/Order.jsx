import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "../orderitems/Order.css";
import { toast, ToastContainer } from "react-toastify";

const Order = () => {
  const { api } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrdersAndProducts = async () => {
    try {
      setLoading(true);
      const resOrders = await api.get(`/api/delivery/getAllData`);
      setOrders(resOrders.data || []);
      
      const resProducts = await api.get(`/api/product/alldata`);
      setProducts(resProducts.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersAndProducts();
  }, []);

  const handleStatusChange = async (e, orderId, productId, btnSize) => {
    const newStatus = e.target.value;
    try {
      const response = await api.post(`/api/delivery/updateStatus1`, {
        status: newStatus,
        userId: orderId,
        productId,
        btnSize
      });
      if (response.data) {
        setOrders(response.data);
        toast.success("Order status updated!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="AdminOrder">
      <div className="admin-order-header">
        <h3>Order Page</h3>
      </div>
      
      {loading ? (
        <div className="admin-loading-state">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="admin-empty-state">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="orders-container-list">
          {orders.map((data, index) => {
            const datadetail = data.cartDetail || [];
            return (
              <div key={index} className="detailordr1">
                {datadetail.map((value, ind) => {
                  const filterData = products.find(
                    (findData) => findData._id === value._id
                  );

                  return (
                    <div key={ind} className="detailorder">
                      <div className="orderImage">
                        <img
                          src={filterData && filterData.images && filterData.images[0] ? filterData.images[0] : ""}
                          alt={data.name}
                          width={60}
                        />
                      </div>
                      
                      <div className="adreesDetail">
                        <div className="Productname">
                          <p className="font-semibold">{filterData ? filterData.ProductName : "Unknown Product"}</p>
                        </div>
                        <div className="userName">
                          <p>
                            Customer: {data.FirstName} {data.LastName}
                          </p>
                        </div>
                        <div className="address">
                          <p className="text-secondary">{data.Street}, {data.City}, {data.State}, {data.Country}</p>
                          <p className="text-secondary">Zip: {data.ZipCode} | Ph: {data.Phone}</p>
                        </div>
                      </div>
                      
                      <div className="pamentDetail">
                        <div className="itemsDetail">
                          <p>Items: {value.count} | Size: {value.BtnSize}</p>
                        </div>
                        <div className="Methodpayment">
                          <p>Method: {data.paymentMethod ? data.paymentMethod.toUpperCase() : "COD"}</p>
                          <p>Payment: <span className="status-payment-label">{data.payment || data.paymentMethod === 'stripe' ? "Paid" : "Pending"}</span></p>
                        </div>
                      </div>
                      
                      <div className="price">
                        <p className="font-bold">₹{filterData ? filterData.ProductPrice * value.count : 0}</p>
                      </div>
                      
                      <div className="orederSatus">
                        <select
                          name="status"
                          value={value ? value.trackOrder1 : "Order Placed"}
                          onChange={(e) => handleStatusChange(e, data._id, value._id, value.BtnSize)}
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Packing">Packing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out of delivery">Out of Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Order;
