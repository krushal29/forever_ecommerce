import { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../../App";
import { Link } from "react-router-dom";
import "../latestCollection/Latestcollection.css";

const Latestcollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendurl}/api/product/alldata`);
        // Take the latest 10 items
        setProducts(response.data.slice(0, 10));
        setError(null);
      } catch (err) {
        console.error("Error loading latest collection:", err);
        setError("Could not load latest collection. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <section className="section-container">
      <div className="section-header">
        <div className="section-title">
          <h2>
            <span>LATEST</span> COLLECTIONS
          </h2>
          <span className="line"></span>
        </div>
        <p className="section-subtitle">
          Discover our fresh new arrivals, crafted from premium fabrics and tailored to keep you ahead of the trend.
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
          ) : products.length === 0 ? (
            <p className="grid-empty-msg">No products available.</p>
          ) : (
            products.map((data, index) => {
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
};

export default Latestcollection;
