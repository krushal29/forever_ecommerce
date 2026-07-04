import { RiDeleteBin6Line } from "react-icons/ri";
import "../cartDetail/CartDetail.css";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const CartDetail = () => {
  const { api, token, user, refreshCart } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [finalBill, setFinalBill] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCartData = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await api.get(`/api/product/getcart`);
      const items = response.data.cartData || [];
      setCartItems(items);

      if (items.length > 0) {
        const postresponse = await api.post(`/api/product/addcart1`, items);
        setProductDetails(postresponse.data);
      } else {
        setProductDetails([]);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Could not load cart items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [token]);

  // Handle quantity change
  const handleQuantityUpdate = async (id, btn, value) => {
    if (value < 1) return;
    
    // Validate stock
    const detail = productDetails.find((d) => d._id === id);
    const stockAvailable = detail && detail.ProductStock !== undefined ? detail.ProductStock : 0;
    if (value > stockAvailable) {
      toast.warn(`Only ${stockAvailable} items available in stock for ${detail ? detail.ProductName : 'this product'}`);
      return;
    }

    try {
      await api.post(`/api/product/countercart`, {
        id,
        updatecount: value,
        btn1: btn,
      });
      
      const updatedCount = cartItems.map((item) => {
        if (item._id === id && item.BtnSize === btn) {
          return { ...item, count: value };
        }
        return item;
      });
      setCartItems(updatedCount);
      refreshCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  // Handle item deletion
  const handleDeleteItem = async (id, btn) => {
    if (!window.confirm("Are you sure you want to remove this item?")) {
      return;
    }
    try {
      const result = await api.post(`/api/product/deleteCart`, {
        id,
        btn,
      });
      
      const updatedItems = result.data.cartData || [];
      setCartItems(updatedItems);
      
      const updatedDetails = productDetails.filter((data) => {
        return updatedItems.some((val) => val._id === data._id);
      });
      setProductDetails(updatedDetails);
      toast.success("Item removed from cart");
      refreshCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item");
    }
  };

  // Bill calculations
  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      const detail = productDetails.find((d) => d._id === item._id);
      if (detail) {
        total += (detail.ProductPrice || 0) * (item.count || 0);
      }
    });
    setFinalBill(total);
  }, [productDetails, cartItems]);

  if (!user) {
    return (
      <div className="cart-empty-container">
        <h3>Please Login to View Cart</h3>
        <p>You need to sign in to manage your cart and proceed to checkout.</p>
        <Link to="/login" className="btn btn-primary">Login Now</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-loading-container">
        <div className="spinner"></div>
        <p>Loading your cart items...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container">
        <h3>Your Cart is Empty</h3>
        <p>Explore our latest arrivals and find the perfect outfit.</p>
        <Link to="/collection" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <>
      <div className="cartDetail">
        <div className="cartDetail1">
          <div className="yourcart">
            <h2>
              <span>YOUR</span> CART
            </h2>
            <span className="line"></span>
          </div>

          {cartItems.map((data, index) => {
            const databtn = productDetails.find((value) => value._id === data._id);
            if (!databtn) return null;

            return (
              <div key={index} className="cartitem">
                <div className="img">
                  <img src={databtn.images[0]} alt={databtn.ProductName} />
                </div>
                <div className="itemdetail">
                  <div className="cart-item-header">
                    <h4>{databtn.ProductName}</h4>
                    <span className="item-size-badge">{data.BtnSize}</span>
                  </div>
                  <div className="priceDetail">
                    <div className="price">
                      <p>₹{databtn.ProductPrice}</p>
                    </div>
                    
                    {/* Modern Quantity controls */}
                    <div className="quantity-controls">
                      <button 
                        type="button" 
                        disabled={data.count <= 1}
                        onClick={() => handleQuantityUpdate(databtn._id, data.BtnSize, data.count - 1)}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        className="qty-input" 
                        min="1"
                        value={data.count} 
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!isNaN(val) && val >= 1) {
                            handleQuantityUpdate(databtn._id, data.BtnSize, val);
                          }
                        }}
                      />
                      <button 
                        type="button"
                        onClick={() => handleQuantityUpdate(databtn._id, data.BtnSize, data.count + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="delete">
                      <button 
                        type="button" 
                        className="delete-item-btn" 
                        onClick={() => handleDeleteItem(data._id, data.BtnSize)}
                        aria-label="Remove item"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Totals Panel */}
      <div className="total">
        <div className="total1">
          <div className="total3">
            <div className="totalfirst">
              <h2>
                <span>CART</span> TOTALS
              </h2>
              <span className="line"></span>
            </div>
            <div className="SubTotal">
              <p>Subtotal</p>
              <p>₹{finalBill.toFixed(2)}</p>
            </div>
            <div className="Shipping">
              <p>Shipping Fee</p>
              <p>₹10.00</p>
            </div>
            <div className="total2">
              <h4>Total</h4>
              <h4>₹{(finalBill + 10).toFixed(2)}</h4>
            </div>
            <div className="checkoutbtn">
              <button 
                className="btn btn-primary"
                onClick={() => navigate("/place-order")}
                style={{ width: '100%' }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
