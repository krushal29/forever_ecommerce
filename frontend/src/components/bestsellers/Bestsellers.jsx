import { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../../App";
import { Link } from "react-router-dom";
import "../latestCollection/Latestcollection.css"; // Reuse shared grid CSS

const Bestsellers = () => {
  const [bestProduct, setBestProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendurl}/api/product/alldata`);
        // Filter bestseller items and take top 5
        const filtered = response.data.filter((data) => data.bestseller === true).slice(0, 5);
        setBestProduct(filtered);
        setError(null);
      } catch (err) {
        console.error("Error loading bestsellers:", err);
        setError("Could not load bestsellers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBestsellers();
  }, []);

  return (
    <section className="section-container">
      <div className="section-header">
        <div className="section-title">
          <h2>
            <span>BEST</span> SELLERS
          </h2>
          <span className="line"></span>
        </div>
        <p className="section-subtitle">
          Explore our most popular styles voted by our customers. High-quality products designed for ultimate comfort and fit.
        </p>
      </div>

      <div className="products-grid-wrapper">
        <div className="products-grid">
          {loading ? (
            // Skeleton Loader Cards
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-text skeleton-name"></div>
                <div className="skeleton-text skeleton-price"></div>
              </div>
            ))
          ) : error ? (
            <p className="grid-error-msg">{error}</p>
          ) : bestProduct.length === 0 ? (
            <p className="grid-empty-msg">No bestseller products available.</p>
          ) : (
            bestProduct.map((data, index) => {
              return (
                <div key={index} className="product-card">
                  <Link to={`/ProductDetail/${data._id}`} className="card-image-link">
                    <div className="card-image-wrapper">
                      <img src={data.images && data.images[0] ? data.images[0] : ""} alt={data.ProductName} loading="lazy" />
                    </div>
                  </Link>
                  <div className="card-info">
                    <p className="card-name">{data.ProductName}</p>
                    <p className="card-price">₹{data.ProductPrice}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Bestsellers;