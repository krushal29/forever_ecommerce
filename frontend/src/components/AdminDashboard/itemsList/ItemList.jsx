import { useEffect, useState, useContext } from "react";
import "../itemsList/ItemList.css";
import { AuthContext } from "../../../context/AuthContext";
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";

const ItemList = () => {
  const { api } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Admin filter states
  const [adminSearch, setAdminSearch] = useState("");
  const [adminCategory, setAdminCategory] = useState("All");
  const [adminSubCategory, setAdminSubCategory] = useState("All");

  // Edit modal states
  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editCategory, setEditCategory] = useState("Men");
  const [editSubCategory, setEditSubCategory] = useState("Topwear");
  const [editBestseller, setEditBestseller] = useState(false);
  const [editSizes, setEditSizes] = useState([]);

  // Edit images states
  const [editImg1, setEditImg1] = useState(null);
  const [editImg2, setEditImg2] = useState(null);
  const [editImg3, setEditImg3] = useState(null);
  const [editImg4, setEditImg4] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/product/alldata`);
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deletehandle = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }
    
    try {
      const response = await api.post(`/api/product/delete`, { id });
      if (response.data) {
        setProducts(response.data);
        toast.success("Product deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const handleStockInputChange = (id, val) => {
    const updated = products.map((prod) => {
      if (prod._id === id) {
        return { ...prod, ProductStock: val };
      }
      return prod;
    });
    setProducts(updated);
  };

  const handleStockSubmit = async (id, stock) => {
    try {
      const response = await api.post(`/api/product/update-stock`, {
        id,
        stock: Number(stock) || 0
      });
      if (response.data.success) {
        toast.success("Stock updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update stock");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditName(product.ProductName);
    setEditDesc(product.ProductDescription);
    setEditPrice(product.ProductPrice);
    setEditStock(product.ProductStock !== undefined ? product.ProductStock : 0);
    setEditCategory(product.ProductCategory);
    setEditSubCategory(product.SubCategory || product.SubCategor || "Topwear");
    setEditBestseller(product.bestseller || false);
    setEditSizes(product.ProductSizes || []);
    
    setEditImg1(null);
    setEditImg2(null);
    setEditImg3(null);
    setEditImg4(null);
  };

  const handleSizeToggle = (size) => {
    setEditSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editName.trim() || !editDesc.trim() || editPrice === "" || editStock === "") {
      return toast.error("Please fill in all required fields");
    }
    
    const formData = new FormData();
    formData.append("id", editingProduct._id);
    formData.append("ProductName", editName.trim());
    formData.append("ProductDescription", editDesc.trim());
    formData.append("ProductPrice", Number(editPrice));
    formData.append("ProductStock", Number(editStock));
    formData.append("bestseller", editBestseller);
    formData.append("ProductCategory", editCategory);
    formData.append("SubCategory", editSubCategory);
    
    editSizes.forEach(size => formData.append("ProductSizes", size));

    if (editImg1) formData.append("image1", editImg1);
    if (editImg2) formData.append("image2", editImg2);
    if (editImg3) formData.append("image3", editImg3);
    if (editImg4) formData.append("image4", editImg4);

    try {
      const response = await api.post(`/api/product/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        setProducts(response.data.products);
        toast.success("Product updated successfully!");
        setEditingProduct(null);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update product");
    }
  };

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.ProductName.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesCategory = adminCategory === "All" || prod.ProductCategory === adminCategory;
    const matchesSubCategory = adminSubCategory === "All" || (prod.SubCategory || prod.SubCategor || "") === adminSubCategory;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  return (
    <div className="List">
      <div className="List1">
        <div className="ListP">
          <h3>All Products List</h3>
        </div>

        {/* Filter controls */}
        <div className="admin-filters-bar" style={{ display: 'flex', gap: '16px', margin: '20px 0', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={adminSearch} 
            onChange={(e) => setAdminSearch(e.target.value)}
            style={{ 
              flex: 1, 
              minWidth: '200px', 
              padding: '10px 14px', 
              borderRadius: '4px', 
              border: '1px solid var(--color-border)', 
              backgroundColor: 'var(--color-bg-main)', 
              color: 'var(--color-primary)' 
            }}
          />
          <select 
            value={adminCategory} 
            onChange={(e) => setAdminCategory(e.target.value)}
            style={{ 
              padding: '10px 16px', 
              borderRadius: '4px', 
              border: '1px solid var(--color-border)', 
              backgroundColor: 'var(--color-bg-main)', 
              color: 'var(--color-primary)',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
          <select 
            value={adminSubCategory} 
            onChange={(e) => setAdminSubCategory(e.target.value)}
            style={{ 
              padding: '10px 16px', 
              borderRadius: '4px', 
              border: '1px solid var(--color-border)', 
              backgroundColor: 'var(--color-bg-main)', 
              color: 'var(--color-primary)',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Subcategories</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        
        {loading ? (
          <div className="admin-loading-state">
            <div className="spinner"></div>
            <p>Loading products list...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="admin-empty-state">
            <p>No products found matching filters.</p>
          </div>
        ) : (
          <div className="tableList">
            <div className="navbartable">
              <p>Image</p>
              <p>Name</p>
              <p>Category</p>
              <p>Price</p>
              <p>Stock</p>
              <p>Action</p>
            </div>
            <div className="datatable">
              {filteredProducts.map((data, index) => {
                return (
                  <div className="display1" key={index}>
                    <p className="imgData">
                      <img src={data.images && data.images[0] ? data.images[0] : ""} alt={data.ProductName} />
                    </p>
                    <p className="text-name">{data.ProductName}</p>
                    <p>{data.ProductCategory}</p>
                    <p className="text-price">₹{data.ProductPrice}</p>
                    <div>
                      <input
                        type="number"
                        min="0"
                        value={data.ProductStock !== undefined ? data.ProductStock : 0}
                        onChange={(e) => handleStockInputChange(data._id, e.target.value)}
                        onBlur={() => handleStockSubmit(data._id, data.ProductStock)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleStockSubmit(data._id, data.ProductStock);
                            e.target.blur();
                          }
                        }}
                        className="admin-stock-input"
                      />
                    </div>
                    <div className="action-buttons-cell">
                      <button 
                        className="edit-item-btn" 
                        onClick={() => handleEditClick(data)}
                        aria-label="Edit product"
                      >
                        <CiEdit />
                      </button>
                      <button 
                        className="delete-item-btn" 
                        onClick={() => deletehandle(data._id, data.ProductName)}
                        aria-label="Delete product"
                      >
                        <IoMdClose />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="edit-modal-overlay">
          <div className="edit-modal-content">
            <div className="edit-modal-header">
              <h3>Edit Product Details</h3>
              <button className="edit-modal-close-btn" onClick={() => setEditingProduct(null)}>
                <IoMdClose />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="edit-form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)}
                  required 
                />
              </div>

              <div className="edit-form-group">
                <label>Product Description</label>
                <textarea 
                  value={editDesc} 
                  onChange={(e) => setEditDesc(e.target.value)}
                  required 
                  rows={4}
                />
              </div>

              <div className="edit-form-row">
                <div className="edit-form-group">
                  <label>Category</label>
                  <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                <div className="edit-form-group">
                  <label>Subcategory</label>
                  <select value={editSubCategory} onChange={(e) => setEditSubCategory(e.target.value)}>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                  </select>
                </div>
              </div>

              <div className="edit-form-row">
                <div className="edit-form-group">
                  <label>Price (₹)</label>
                  <input 
                    type="number" 
                    value={editPrice} 
                    onChange={(e) => setEditPrice(e.target.value)} 
                    required 
                    min="0"
                  />
                </div>

                <div className="edit-form-group">
                  <label>Stock Quantity</label>
                  <input 
                    type="number" 
                    value={editStock} 
                    onChange={(e) => setEditStock(e.target.value)} 
                    required 
                    min="0"
                  />
                </div>
              </div>

              <div className="edit-form-group" style={{ marginTop: '16px' }}>
                <label>Select Sizes</label>
                <div className="allsizes" style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <div key={size} className="size">
                      <button 
                        type="button" 
                        className={editSizes.includes(size) ? "active" : ""}
                        onClick={() => handleSizeToggle(size)}
                        style={{ padding: '8px 14px', borderRadius: '4px', border: '1px solid var(--color-border)', cursor: 'pointer' }}
                      >
                        {size}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="edit-form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '20px 0' }}>
                <input 
                  type="checkbox" 
                  id="edit-bestseller" 
                  checked={editBestseller} 
                  onChange={(e) => setEditBestseller(e.target.checked)} 
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="edit-bestseller" style={{ margin: 0, cursor: 'pointer', userSelect: 'none' }}>Add to bestseller</label>
              </div>

              <div className="edit-form-group">
                <label>Upload Replacement Images (Optional)</label>
                <div className="upload" style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <label className="upload-label" style={{ width: '70px', height: '70px', border: '1px dashed #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>+ Image 1</span>
                    <input type="file" onChange={(e) => setEditImg1(e.target.files[0])} hidden />
                  </label>
                  <label className="upload-label" style={{ width: '70px', height: '70px', border: '1px dashed #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>+ Image 2</span>
                    <input type="file" onChange={(e) => setEditImg2(e.target.files[0])} hidden />
                  </label>
                  <label className="upload-label" style={{ width: '70px', height: '70px', border: '1px dashed #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>+ Image 3</span>
                    <input type="file" onChange={(e) => setEditImg3(e.target.files[0])} hidden />
                  </label>
                  <label className="upload-label" style={{ width: '70px', height: '70px', border: '1px dashed #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>+ Image 4</span>
                    <input type="file" onChange={(e) => setEditImg4(e.target.files[0])} hidden />
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button 
                  type="button" 
                  onClick={() => setEditingProduct(null)}
                  style={{ padding: '10px 20px', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'transparent', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', borderRadius: '4px', border: 'none', backgroundColor: 'var(--color-primary)', color: 'var(--color-bg-main)', cursor: 'pointer', fontWeight: 600 }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ItemList;
