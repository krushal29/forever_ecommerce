import { useEffect, useState } from "react";
import axios from "axios";
import "../collectioncomponents/Collection.css";
import { backendurl } from "../../App";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Collection1 = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Multi-select category states
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Sorting option
  const [sortOption, setSortOption] = useState("relevant");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendurl}/api/product/alldata`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error("Error loading collection:", err);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Category toggle handler
  const handleCategoryChange = (e) => {
    const val = e.target.value.toLowerCase();
    setCategories(prev =>
      prev.includes(val) ? prev.filter(c => c !== val) : [...prev, val]
    );
  };

  // Subcategory toggle handler
  const handleSubCategoryChange = (e) => {
    const val = e.target.value.toLowerCase();
    setSubCategories(prev =>
      prev.includes(val) ? prev.filter(s => s !== val) : [...prev, val]
    );
  };

  // Apply filters, search, and sorting
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchQuery.trim() !== "") {
      result = result.filter(prod =>
        prod.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter (Men, Women, Kids)
    if (categories.length > 0) {
      result = result.filter(prod =>
        categories.includes(prod.ProductCategory.toLowerCase())
      );
    }

    // Subcategory filter (Topwear, Bottomwear, Winterwear)
    if (subCategories.length > 0) {
      result = result.filter(prod => {
        const sub = (prod.SubCategory || prod.SubCategor || "").toLowerCase();
        return subCategories.includes(sub);
      });
    }

    // Sorting
    if (sortOption === "low-high") {
      result.sort((a, b) => a.ProductPrice - b.ProductPrice);
    } else if (sortOption === "high-low") {
      result.sort((a, b) => b.ProductPrice - a.ProductPrice);
    }

    setFilteredProducts(result);
  }, [products, categories, subCategories, searchQuery, sortOption]);

  return (
    <div className="collection-container">
      <div className="collection-main">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <h3 className="filters-title">FILTERS</h3>

          <div className="filter-group">
            <h4>CATEGORIES</h4>
            <div className="filter-options">
              <div className="checkbox-option">
                <input
                  type="checkbox"
                  id="cat-men"
                  value="Men"
                  onChange={handleCategoryChange}
                />
                <label htmlFor="cat-men">Men</label>
              </div>
              <div className="checkbox-option">
                <input
                  type="checkbox"
                  id="cat-women"
                  value="Women"
                  onChange={handleCategoryChange}
                />
                <label htmlFor="cat-women">Women</label>
              </div>
              <div className="checkbox-option">
                <input
                  type="checkbox"
                  id="cat-kids"
                  value="Kids"
                  onChange={handleCategoryChange}
                />
                <label htmlFor="cat-kids">Kids</label>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h4>TYPE</h4>
            <div className="filter-options">
              <div className="checkbox-option">
                <input
                  type="checkbox"
                  id="type-topwear"
                  value="Topwear"
                  onChange={handleSubCategoryChange}
                />
                <label htmlFor="type-topwear">Topwear</label>
              </div>
              <div className="checkbox-option">
                <input
                  type="checkbox"
                  id="type-bottomwear"
                  value="Bottomwear"
                  onChange={handleSubCategoryChange}
                />
                <label htmlFor="type-bottomwear">Bottomwear</label>
              </div>
              <div className="checkbox-option">
                <input
                  type="checkbox"
                  id="type-winterwear"
                  value="Winterwear"
                  onChange={handleSubCategoryChange}
                />
                <label htmlFor="type-winterwear">Winterwear</label>
              </div>
            </div>
          </div>
        </aside>

        {/* Collection Right Content */}
        <div className="collection-content">

          {/* Search bar inside collections */}
          <div className="search-bar-inline">
            <CiSearch className="search-inline-icon" />
            <input
              type="text"
              placeholder="Search collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Collection header actions */}
          <div className="collection-header-row">
            <div className="collection-title-box">
              <h2><span>ALL</span> COLLECTIONS</h2>
              <span className="line"></span>
            </div>

            <div className="sorting-box">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>

          {/* Result count */}
          {!loading && !error && (
            <p className="results-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          )}

          {/* Grid display */}
          <div className="products-grid collection-grid">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text skeleton-name"></div>
                  <div className="skeleton-text skeleton-price"></div>
                </div>
              ))
            ) : error ? (
              <p className="grid-error-msg">{error}</p>
            ) : filteredProducts.length === 0 ? (
              <div className="empty-results">
                <h3>No Products Found</h3>
                <p>Try resetting filters or checking your search query.</p>
              </div>
            ) : (
              filteredProducts.map((data, index) => {
                const outOfStock = data.ProductStock !== undefined && data.ProductStock === 0;
                return (
                  <div key={index} className="product-card">
                    <Link to={`/ProductDetail/${data._id}`} className="card-image-link">
                      <div className="card-image-wrapper">
                        <img src={data.images && data.images[0] ? data.images[0] : ""} alt={data.ProductName} loading="lazy" />
                        {outOfStock && (
                          <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.38)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 2
                          }}>
                            <span style={{
                              backgroundColor: '#ef4444', color: '#fff',
                              padding: '4px 10px', borderRadius: '4px',
                              fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em'
                            }}>OUT OF STOCK</span>
                          </div>
                        )}
                        {data.bestseller && !outOfStock && (
                          <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
                            <span style={{
                              backgroundColor: 'var(--color-primary)', color: 'var(--color-bg-main)',
                              padding: '3px 8px', borderRadius: '4px',
                              fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em'
                            }}>BESTSELLER</span>
                          </div>
                        )}
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
      </div>
    </div>
  );
};

export default Collection1;
