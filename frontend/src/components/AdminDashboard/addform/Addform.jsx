import { useState, useContext } from "react";
import "../addform/Addform.css";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// Inline SVG data URI placeholder (no external asset needed)
const upload_area = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='12' font-family='sans-serif'%3E+ Upload%3C/text%3E%3C/svg%3E";

const Addform = () => {
  const { api } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [onClickBtn, setOnClickBtn] = useState(false);
  const [onClickBtn1, setOnClickBtn1] = useState(false);
  const [onClickBtn2, setOnClickBtn2] = useState(false);
  const [onClickBtn3, setOnClickBtn3] = useState(false);
  const [onClickBtn4, setOnClickBtn4] = useState(false);

  const [image1, setimage1] = useState(null);
  const [image2, setimage2] = useState(null);
  const [image3, setimage3] = useState(null);
  const [image4, setimage4] = useState(null);
  
  const [ProductName, setproductName] = useState("");
  const [ProductDescription, setproductDescription] = useState("");
  const [ProductPrice, setproductPrice] = useState("");
  const [ProductStock, setProductStock] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [ProductCategory, setProductCategory] = useState("Men");
  const [SubCategory, setSubCategory] = useState("Topwear");
  
  const [ProductSizes1, setProductSizes1] = useState();
  const [ProductSizes2, setProductSizes2] = useState();
  const [ProductSizes3, setProductSizes3] = useState();
  const [ProductSizes4, setProductSizes4] = useState();
  const [ProductSizes5, setProductSizes5] = useState();

  const ProductSizes = [
    ProductSizes1,
    ProductSizes2,
    ProductSizes3,
    ProductSizes4,
    ProductSizes5,
  ].filter(size => size !== undefined && size !== null);

  const submithandle = async (e) => {
    e.preventDefault();

    if (!ProductName.trim() || !ProductDescription.trim() || !ProductPrice || ProductStock === "") {
      return toast.error("Please fill in all required product fields");
    }

    if (ProductSizes.length === 0) {
      return toast.error("Please select at least one product size");
    }

    const formData = new FormData();
    formData.append("ProductName", ProductName.trim());
    formData.append("ProductDescription", ProductDescription.trim());
    formData.append("ProductPrice", Number(ProductPrice));
    formData.append("ProductStock", Number(ProductStock));
    formData.append("bestseller", bestseller);
    formData.append("ProductCategory", ProductCategory);
    formData.append("SubCategory", SubCategory);
    
    // Append array sizes properly
    ProductSizes.forEach((size) => formData.append("ProductSizes", size));

    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);

    try {
      const response = await api.post(
        `/api/product/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Product added successfully!");
        setTimeout(() => navigate("/items"), 1200);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="Addform">
      <div className="Addform1">
        <div className="uploadImg">
          <h4>Upload Image</h4>
        </div>
        
        {/* Modern Image Upload with Preview placeholders */}
        <div className="upload">
          <label className="upload-label">
            <img src={image1 ? URL.createObjectURL(image1) : upload_area} alt="" />
            <input type="file" onChange={(e) => setimage1(e.target.files[0])} hidden />
          </label>
          <label className="upload-label">
            <img src={image2 ? URL.createObjectURL(image2) : upload_area} alt="" />
            <input type="file" onChange={(e) => setimage2(e.target.files[0])} hidden />
          </label>
          <label className="upload-label">
            <img src={image3 ? URL.createObjectURL(image3) : upload_area} alt="" />
            <input type="file" onChange={(e) => setimage3(e.target.files[0])} hidden />
          </label>
          <label className="upload-label">
            <img src={image4 ? URL.createObjectURL(image4) : upload_area} alt="" />
            <input type="file" onChange={(e) => setimage4(e.target.files[0])} hidden />
          </label>
        </div>

        <form onSubmit={submithandle}>
          <div className="productName">
            <h4>Product name</h4>
          </div>
          <div className="producttype">
            <input
              type="text"
              placeholder="Type here"
              value={ProductName}
              onChange={(e) => setproductName(e.target.value)}
              required
            />
          </div>
          
          <div className="productdescription">
            <h4>Product description</h4>
          </div>
          <div className="inputdescription">
            <textarea
              value={ProductDescription}
              placeholder="Write content here"
              onChange={(e) => setproductDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="Allcategory">
            <div className="Productcategory">
              <div className="category">
                <h4>Product category</h4>
              </div>
              <div className="inputcategory">
                <select
                  value={ProductCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
            </div>
            
            <div className="SubCategory">
              <div className="category">
                <h4>Sub category</h4>
              </div>
              <div className="inputcategory">
                <select 
                  value={SubCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </select>
              </div>
            </div>
            
            <div className="ProductPrice">
              <div className="category">
                <h4>Product Price</h4>
              </div>
              <div className="inputcategory">
                <input
                  type="number"
                  placeholder="25"
                  value={ProductPrice}
                  onChange={(e) => setproductPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="ProductPrice">
              <div className="category">
                <h4>Product Stock</h4>
              </div>
              <div className="inputcategory">
                <input
                  type="number"
                  placeholder="100"
                  value={ProductStock}
                  onChange={(e) => setProductStock(e.target.value)}
                  required
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="ProductSizes">
            <h4>Product Sizes</h4>
            <div className="allsizes">
              <div className="size">
                <button 
                  type="button"
                  name="S" 
                  className={onClickBtn ? "active" : ""} 
                  onClick={(e) => {
                    setOnClickBtn(!onClickBtn);
                    setProductSizes1(!onClickBtn ? e.target.name : undefined);
                  }}
                >
                  S
                </button>
              </div>
              <div className="size">
                <button 
                  type="button"
                  name="M" 
                  className={onClickBtn1 ? "active" : ""} 
                  onClick={(e) => {
                    setOnClickBtn1(!onClickBtn1);
                    setProductSizes2(!onClickBtn1 ? e.target.name : undefined);
                  }}
                >
                  M
                </button>
              </div>
              <div className="size">
                <button 
                  type="button"
                  name="L" 
                  className={onClickBtn2 ? "active" : ""} 
                  onClick={(e) => {
                    setOnClickBtn2(!onClickBtn2);
                    setProductSizes3(!onClickBtn2 ? e.target.name : undefined);
                  }}
                >
                  L
                </button>
              </div>
              <div className="size">
                <button
                  type="button"
                  name="XL"   
                  className={onClickBtn3 ? "active" : ""} 
                  onClick={(e) => {
                    setOnClickBtn3(!onClickBtn3);
                    setProductSizes4(!onClickBtn3 ? e.target.name : undefined);
                  }}
                >
                  XL
                </button>
              </div>
              <div className="size">
                <button
                  type="button"
                  name="XXL" 
                  className={onClickBtn4 ? "active" : ""} 
                  onClick={(e) => {
                    setOnClickBtn4(!onClickBtn4);
                    setProductSizes5(!onClickBtn4 ? e.target.name : undefined);
                  }}
                >
                  XXL
                </button>
              </div>
            </div>
          </div>

          <div className="bestSellers">
            <input
              type="checkbox"
              id="admin-bestseller"
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
            />
            <label htmlFor="admin-bestseller">Add to bestseller</label>
          </div>

          <div className="Addbtn">
            <button type="submit">ADD PRODUCT</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Addform;
