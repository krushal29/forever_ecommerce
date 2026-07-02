import "../ProdectdetailComponent/productDetail.css";

//TOAST
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//img
import star from "../../assets/star.png";
import star1 from "../../assets/star1.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../../App";

const ProductDetail = () => {
  //TOAST
  const notifywarn = (val) => toast.warn(val);
  const notifySucess=(val)=>toast.success(val);

  //VARIBLE
  const [product, setProduct] = useState([]);
  const [btn, setbtn] = useState("");
  const [boderDisplay, setboderDisplay] = useState(false);
  // console.log("btn", btn);

  // console.log(`${backendurl}/api/product/alldata`);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(`${backendurl}/api/product/alldata`);
      setProduct(response.data);
    };
    data();
  }, []);
  // console.log(product);

  const { id } = useParams();
  // console.log(product);

  const filter = product.filter((data) => {
    return data._id === id;
  });
  const productfilter = filter.length > 0 ? filter[0] : null;
  // console.log("filtedatar", productfilter);

  const addcard = async (e) => {
    e.preventDefault();
    if (boderDisplay) {
      notifySucess("Product added in cart");
      const data = await axios.post(`${backendurl}/api/product/addcard`, {
        filter,
        btn,
      });
    } else {
      // alert("Please select size");
      notifywarn("Please select size");
    }
    // console.log(data);
  };

  const handleClick = (size) => {
    setboderDisplay(true);
    setbtn(size);
  };
  return (
    <div className="product">
      {productfilter && (
        <div className="product1">
          <div className="img1">
            <img src={productfilter.images[0]} alt="" />
          </div>
          <div className="img2">
            <img src={productfilter.images[0]} alt="" />
          </div>
          <div className="imgDetail">
            <div className="imgDetail1">
              <h2>{productfilter.ProductName}</h2>
              <div className="star">
                <div className="star1">
                  <img src={star} alt="" />
                </div>
                <div className="star1">
                  <img src={star} alt="" />
                </div>
                <div className="star1">
                  <img src={star} alt="" />
                </div>
                <div className="star1">
                  <img src={star} alt="" />
                </div>
                <div className="star1">
                  <img src={star1} alt="" />
                </div>
                <div className="rating">
                  <p>(122)</p>
                </div>
              </div>
              <div className="price1">
                <h2>${productfilter.ProductPrice}</h2>
              </div>
              <div className="ProductDescription">
                <p>{productfilter.ProductDescription}</p>
              </div>
              <div className="productSize">
                <p>Select Size</p>
                <div className="allsizes">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleClick(size)}
                      style={
                        boderDisplay && btn === size
                          ? { border: "1px solid pink" }
                          : undefined
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <form action="" onClick={addcard}>
                <div className="AddToCartbtn">
                  <button>ADD TO CART</button>
                </div>
              </form>
            </div>
            <div className="detailsProduct">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default ProductDetail;
