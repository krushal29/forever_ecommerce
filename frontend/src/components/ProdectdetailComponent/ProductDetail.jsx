import "../ProdectdetailComponent/productDetail.css";

// TOAST
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// img
import star from "../../assets/star.png";
import star1 from "../../assets/star1.png";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { api, refreshCart, user, backendUrl } = useContext(AuthContext);

  // TOAST
  const notifywarn = (val) => toast.warn(val);
  const notifySucess = (val) => toast.success(val);

  // VARIABLE
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Fetch all products to find current
        const response = await axios.get(`${backendUrl}/api/product/alldata`);
        const foundProduct = response.data.find((item) => item._id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          if (foundProduct.images && foundProduct.images.length > 0) {
            setActiveImage(foundProduct.images[0]);
          }
        }
      } catch (err) {
        console.error("Error loading product detail:", err);
        toast.error("Could not fetch product information.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id, backendUrl]);

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!user) {
      notifywarn("Please login to purchase items");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    if (!selectedSize) {
      notifywarn("Please select a size");
      return;
    }

    const stockAvailable = product.ProductStock !== undefined ? product.ProductStock : 0;
    if (stockAvailable <= 0) {
      notifywarn("This product is currently out of stock");
      return;
    }
    if (quantity > stockAvailable) {
      notifywarn(`Only ${stockAvailable} items available in stock`);
      return;
    }

    try {
      // Use protected api client from AuthContext
      await api.post(`/api/product/addcard`, {
        filter: [product],
        btn: selectedSize,
        qty: quantity,
      });
      notifySucess("Product added to cart");
      setQuantity(1);
      refreshCart(); // Update global cart count
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Could not add item to cart");
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="spinner"></div>
        <p>Loading Product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-error">
        <h3>Product Not Found</h3>
        <button className="btn btn-outline" onClick={() => navigate("/collection")}>
          Back to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="product-container">
      <div className="product-main">
        {/* Left Side: Thumbnail List */}
        <div className="thumbnails-wrapper">
          {product.images && product.images.map((imgUrl, idx) => (
            <div 
              key={idx} 
              className={`thumbnail-box ${activeImage === imgUrl ? 'active' : ''}`}
              onClick={() => setActiveImage(imgUrl)}
            >
              <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
            </div>
          ))}
        </div>

        {/* Center: Main Preview Image */}
        <div className="main-preview-wrapper">
          <img src={activeImage} alt={product.ProductName} className="main-preview-img" />
        </div>

        {/* Right Side: Product Details info */}
        <div className="product-info-panel">
          <h1 className="product-name-title">{product.ProductName}</h1>
          
          {/* Star ratings */}
          <div className="rating-row">
            <div className="star-icons">
              <img src={star} alt="Star Rating" />
              <img src={star} alt="Star Rating" />
              <img src={star} alt="Star Rating" />
              <img src={star} alt="Star Rating" />
              <img src={star1} alt="Star Rating half" />
            </div>
            <span className="rating-review-count">(122 Reviews)</span>
          </div>

          {/* Pricing */}
          <div className="product-price-label">₹{product.ProductPrice}</div>

          {/* Availability Status Badge */}
          <div style={{ marginBottom: "20px" }}>
            {product.ProductStock !== undefined && product.ProductStock > 0 ? (
              <span style={{
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "#10b981",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "600",
                display: "inline-block"
              }}>
                ✓ In Stock ({product.ProductStock} units left)
              </span>
            ) : (
              <span style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "600",
                display: "inline-block"
              }}>
                ✗ Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="product-desc-para">{product.ProductDescription}</p>

          {/* Size Select */}
          <div className="size-select-group">
            <p className="section-label">Select Size</p>
            <div className="size-buttons">
              {(product.ProductSizes && product.ProductSizes.length > 0 
                ? product.ProductSizes 
                : ["S", "M", "L", "XL", "XXL"]
              ).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Select */}
          <div className="qty-select-group">
            <p className="section-label">Select Quantity</p>
            <div className="quantity-controls">
              <button 
                type="button" 
                disabled={quantity <= 1 || (product.ProductStock !== undefined && product.ProductStock <= 0)}
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="qty-input"
                min="1"
                max={product.ProductStock !== undefined ? product.ProductStock : 0}
                value={product.ProductStock !== undefined && product.ProductStock <= 0 ? 0 : quantity}
                disabled={product.ProductStock !== undefined && product.ProductStock <= 0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const maxStock = product.ProductStock !== undefined ? product.ProductStock : 0;
                  if (val >= 1 && val <= maxStock) {
                    setQuantity(val);
                  } else if (val > maxStock) {
                    notifywarn(`Only ${maxStock} items available in stock`);
                    setQuantity(maxStock);
                  }
                }}
              />
              <button 
                type="button"
                disabled={quantity >= (product.ProductStock !== undefined ? product.ProductStock : 0)}
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <form onSubmit={handleAddToCart} className="add-to-cart-form">
            <button 
              className="btn btn-primary btn-add-cart"
              disabled={product.ProductStock !== undefined && product.ProductStock <= 0}
            >
              {product.ProductStock !== undefined && product.ProductStock <= 0 ? "OUT OF STOCK" : "ADD TO CART"}
            </button>
          </form>

          {/* Brand Bullet points */}
          <div className="brand-trust-bullets">
            <p>✓ 100% Original product warranty.</p>
            <p>✓ Cash on delivery option is available.</p>
            <p>✓ Easy exchange and return policy within 7 days.</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
