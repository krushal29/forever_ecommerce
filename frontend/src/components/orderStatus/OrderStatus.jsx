import { useEffect, useState, useContext } from "react";
import "../../components/orderStatus/OrderStatus.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const OrderStatus = () => {
  const { api, user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch User Orders
        const deliveryResponse = await api.get(`/api/delivery/getdata`);
        setOrders(deliveryResponse.data || []);

        // Fetch Products Catalog for image/details matching
        const productResponse = await api.get(`/api/product/alldata`);
        setProducts(productResponse.data || []);
      } catch (error) {
        console.error("Error loading order status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndProducts();
  }, [user]);

  if (loading) {
    return (
      <div className="orders-loading-state">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty-state">
        <h3>No Orders Found</h3>
        <p>You haven't placed any orders yet. Visit our store to find your next favorite clothes!</p>
        <Link to="/collection" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="orderCard">
      <div className="orderCard1">
        <div className="Myorder">
          <h2>
            <span>MY </span>ORDERS
          </h2>
          <span className="line"></span>
        </div>

        <div className="orders-list-wrapper">
          {orders.map((order, orderIndex) => (
            <div key={orderIndex} className="order-group-box">
              <div className="order-group-header">
                <div className="order-meta-info">
                  <span className="meta-label">ORDER ID:</span>
                  <span className="meta-val">{order._id}</span>
                </div>
                <div className="order-meta-info">
                  <span className="meta-label">DATE:</span>
                  <span className="meta-val">{new Date(order.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
                <div className="order-meta-info">
                  <span className="meta-label">TOTAL BILL:</span>
                  <span className="meta-val font-semibold">₹{(order.bill || 0) + 10}.00</span>
                </div>
              </div>

              <div className="order-items-list">
                {order.cartDetail && order.cartDetail.map((cartItem, itemIndex) => {
                  const matchedProduct = products.find(
                    (product) => product._id === cartItem._id
                  );

                  return (
                    <div key={itemIndex} className="trackCard1">
                      <div className="imgTrack1">
                        <img 
                          src={matchedProduct && matchedProduct.images && matchedProduct.images[0] ? matchedProduct.images[0] : ""} 
                          alt={matchedProduct ? matchedProduct.ProductName : "Product"} 
                        />
                      </div>
                      
                      <div className="secondpart1">
                        <div className="secondPart">
                          <h4 className="item-name-title">
                            {matchedProduct ? matchedProduct.ProductName : "Unknown Product"}
                          </h4>
                          <div className="PriceQuntity">
                            <span className="price-tag">₹{matchedProduct ? matchedProduct.ProductPrice : 0}</span>
                            <span className="qty-tag">Quantity: {cartItem.count}</span>
                            <span className="size-tag">Size: {cartItem.BtnSize}</span>
                          </div>
                          <div className="payment-type">
                            Payment: {order.paymentMethod ? order.paymentMethod.toUpperCase() : "COD"} 
                            <span className="payment-status-badge">
                              ({order.payment || order.paymentMethod === 'stripe' ? 'Paid' : 'Pending'})
                            </span>
                          </div>
                        </div>

                        <div className="thidPartOrderStatus">
                          <div className="status-indicator-row">
                            <span className={`status-indicator-dot ${
                              (cartItem.trackOrder1 || 'Order Placed').toLowerCase().replace(/\s+/g, '-')
                            }`}></span>
                            <span className="status-text-val">
                              {cartItem.trackOrder1 ? cartItem.trackOrder1 : "Order Placed"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="trackOrder">
                        <button className="btn btn-outline btn-sm-track">Track Item</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
