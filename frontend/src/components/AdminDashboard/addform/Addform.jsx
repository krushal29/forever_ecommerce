import { useState } from "react";
import "../addform/Addform.css";
import axios from "axios";
import { backendurl } from "../../../App";
import { useNavigate } from "react-router-dom";

const Addform = () => {
  const navigate = useNavigate();
  const [onClickBtn,setOnClickBtn]=useState(false);
  const [onClickBtn1,setOnClickBtn1]=useState(false);
  const [onClickBtn2,setOnClickBtn2]=useState(false);
  const [onClickBtn3,setOnClickBtn3]=useState(false);
  const [onClickBtn4,setOnClickBtn4]=useState(false);

  const [image1, setimage1] = useState(null);
  const [image2, setimage2] = useState(null);
  const [image3, setimage3] = useState(null);
  const [image4, setimage4] = useState(null);
  // const images=[image1,image2,image3,image4];
  const [ProductName, setproductName] = useState("");
  const [ProductDescription, setproductDescription] = useState("");
  const [ProductPrice, setproductPrice] = useState(0);
  const [bestseller, setBestseller] = useState(false);
  const [ProductCategory, setProductCategory] = useState("Men");
  const [SubCategor, setSubCategor] = useState("Topwear");
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
  ];

  console.log(ProductName);
  console.log(
    ProductDescription,
    ProductPrice,
    bestseller,
    ProductCategory,
    bestseller,
    ProductSizes
  );

  const submithandle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ProductName", ProductName);
    formData.append("ProductDescription", ProductDescription);
    formData.append("ProductPrice", ProductPrice);
    formData.append("bestseller", bestseller);
    formData.append("ProductCategory", ProductCategory);
    formData.append("SubCategor", SubCategor);
    ProductSizes.forEach((size, index) =>
      formData.append(`ProductSizes[${index}]`, size)
    );

    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);
// console.log(formData);

    try {
      const response = await axios.post(
        `${backendurl}/api/product/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // console.log(response);

      if (response.status === 200) {
        navigate("/items");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="Addform">
      <div className="Addform1">
        <div className="uploadImg">
          <h4>Upload Image</h4>
        </div>
        <div className="upload">
          <div className="file1">
            <input type="file" onChange={(e) => setimage1(e.target.files[0])} />
          </div>
          <div className="file1">
            <input type="file" onChange={(e) => setimage2(e.target.files[0])} />
          </div>
          <div className="file1">
            <input type="file" onChange={(e) => setimage3(e.target.files[0])} />
          </div>
          <div className="file1">
            <input type="file" onChange={(e) => setimage4(e.target.files[0])} />
          </div>
        </div>
        <div className="productName">
          <h4>Product name</h4>
        </div>
        <div className="producttype">
          <input
            type="text"
            placeholder="Type here"
            value={ProductName}
            name="ProductName"
            onChange={(e) => setproductName(e.target.value)}
          />
        </div>
        <div className="productdescription">
          <h4>Product description</h4>
        </div>
        <div className="inputdescription">
          <textarea
            name="ProductDescription"
            value={ProductDescription}
            placeholder="Write content here"
            onChange={(e) => setproductDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="Allcategory">
          <div className="Productcategory">
            <div className="category">
              <h4>Product category</h4>
            </div>
            <div className="inputcategory">
              <select
                name="ProductCategory"
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
            <div
              className="inputcategory"
              onChange={(e) => setSubCategor(e.target.value)}
            >
              <select name="">
                <option value="Topwear" name>
                  Topwear
                </option>
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
                value={ProductPrice}
                name="ProductPrice"
                onChange={(e) => setproductPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="ProductSizes">
          <h4>Product Sizes</h4>
          <div className="allsizes">
            <div className="size">
              <button name="S" style={onClickBtn?{backgroundColor:"pink"}:undefined} onClick={(e) => {
                setOnClickBtn(!onClickBtn);
               setProductSizes1(!onClickBtn?e.target.name:undefined)}}>
                S
              </button>
            </div>
            <div className="size">
              <button name="M" style={onClickBtn1?{backgroundColor:"pink"}:undefined} onClick={(e) => {
                setOnClickBtn1(!onClickBtn1)
                setProductSizes2(!onClickBtn1?e.target.name:undefined)}}>
                M
              </button>
            </div>
            <div className="size">
              <button name="L" style={onClickBtn2?{backgroundColor:"pink"}:undefined} onClick={(e) => {
                setOnClickBtn2(!onClickBtn2)
                setProductSizes3(!onClickBtn2?e.target.name:undefined)}}>
                L
              </button>
            </div>
            <div className="size">
              <button
                name="XL"   style={onClickBtn3?{backgroundColor:"pink"}:undefined}
                onClick={(e) => {
                  setOnClickBtn3(!onClickBtn3)
                  setProductSizes4(!onClickBtn3?e.target.name:undefined)}}
              >
                XL
              </button>
            </div>
            <div className="size">
              <button
                name="XXL" style={onClickBtn4?{backgroundColor:"pink"}:undefined}
                onClick={(e) => {
                  setOnClickBtn4(!onClickBtn4)
                  setProductSizes5(!onClickBtn4?e.target.name:undefined)}}
              >
                XXL
              </button>
            </div>
          </div>
        </div>
        <div className="bestSellers">
          <input
            type="checkbox"
            name="bestseller"
            value={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
          />
          <label htmlFor="">Add to bestseller</label>
        </div>
        <form action="" onSubmit={submithandle}>
          <div className="Addbtn">
            <button>ADD</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addform;
