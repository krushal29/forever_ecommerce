import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { backendurl } from "../../App";
import "../latestCollection/Latestcollection.css"; // Reuse shared grid CSS

const RelatedProduct = () => {
  const { id } = useParams();
  const [relatedData, setrelatedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendurl}/api/product/alldata`);
        const allProducts = response.data;
        
        const currentProduct = allProducts.find((data) => data._id === id);
        if (currentProduct) {
          const currentSub = currentProduct.SubCategory || currentProduct.SubCategor || "";
          
          const related = allProducts.filter(
            (data) => (data.SubCategory === currentSub || data.SubCategor === currentSub) && data._id !== id
          ).slice(0, 5); // Limit to top 5 related items
          
          setrelatedData(related);
        }
      } catch (err) {
        console.error("Error loading related products:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchRelated();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="section-container">
        <p>Loading related products...</p>
      </div>
    );
  }

  if (relatedData.length === 0) {
    return null; // Don't show the header if there are no related items
  }

  return (
    <section className="section-container">
      <div className="section-header">
        <div className="section-title">
          <h2>
            <span>RELATED</span> PRODUCTS
          </h2>
          <span className="line"></span>
        </div>
      </div>
      <div className="products-grid-wrapper">
        <div className="products-grid">
          {relatedData.map((data, index) => {
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
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedProduct;
