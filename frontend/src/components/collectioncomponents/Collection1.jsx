import { useEffect, useState } from "react";
import axios from "axios";
import "../collectioncomponents/Collection.css";
import { backendurl } from "../../App";
import { Link } from "react-router-dom";

const Collection1 = () => {
  const [product, setProduct] = useState([]);
  const [original,setOriginal]=useState([]);
  const [isCheckMen, setIsCheckMen] = useState(false);
  const [isCheckWomen, setIsCheckWomen] = useState(false);
  const [isCheckkids, setIsCheckkids] = useState(false);
  const [isChecktopwear, setIsCheckwear] = useState(false);
  const [isCheckBottomwear, setIsCheckbottomwear] = useState(false);
  const [isCheckWinterwear, setIsCheckWinterwear] = useState(false);
  // console.log(`${backendurl}/api/product/alldata`);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(`${backendurl}/api/product/alldata`);
      setProduct(response.data);
      setOriginal(response.data);
    };
    data();
  }, []);

  // console.log(product);
  // const searchdata=async (name)=>{
  //   if(isCheckMen||isCheckWomen||isCheckkids){
  //     console.log(name);
  //     const filterdata=product.filter((data)=>data.ProductCategory===name);
  //     setProduct(filterdata);
  //   }
  //   else{
  //     console.log("name",name);
  //     const response1 = await axios.get(`${backendurl}/api/product/alldata`);
  //     setProduct(response1.data);
  //   }
  // }

  // const searchdata1=async (name)=>{
  //   if(isCheckBottomwear||isCheckWinterwear||isChecktopwear){
  //     console.log(name);
  //     const filterdata=product.filter((data)=>data.SubCategor===name);
  //     setProduct(filterdata);
  //   }
  //   else{
  //     console.log("name",name);
  //     const response1 = await axios.get(`${backendurl}/api/product/alldata`);
  //     setProduct(response1.data);
  //   }
  // }
  // useEffect(()=>{
  //   searchdata("Men");
  //   // console.log("men",isCheckMen);
  // },[isCheckMen])
  // useEffect(()=>{
  //   searchdata("Women");
  //   // console.log("women",isCheckWomen);
  // },[isCheckWomen])
  // useEffect(()=>{
  //   // console.log("kids",isCheckkids);
  //   searchdata("Kids");
  // },[isCheckkids])

  // useEffect(()=>{
  //   // console.log("topwear",isChecktopwear);
  //   searchdata1("Topwear");
  // },[isChecktopwear])
  // useEffect(()=>{
  //   // console.log("bottomwear",isCheckBottomwear);
  //   searchdata1("Bottomwear");
  // },[isCheckBottomwear]);
  // useEffect(()=>{
  //   // console.log("winter",isCheckWinterwear);
  //   searchdata1("Winterwear")
  // },[isCheckWinterwear])

  const filterdata = () => {
    let filter1 = original;

    if (isCheckMen || isCheckWomen || isCheckkids) {
      filter1 = filter1.filter((data) =>
        isCheckMen
          ? (data.ProductCategory === "Men")
          : isCheckWomen
          ? (data.ProductCategory === "Women")
          : isCheckkids
          ? (data.ProductCategory === "kids")
          : false
      );
    }
    if (isChecktopwear || isCheckBottomwear || isCheckWinterwear) {
      filter1 = filter1.filter((data) =>
        isChecktopwear
          ? (data.SubCategor === "Topwear")
          : isCheckBottomwear
          ? (data.SubCategor === "Bottomwear")
          : isCheckWinterwear
          ? (data.SubCategor === "Winterwear")
          : false
      );
    }
    
    setProduct(filter1);
  };

  useEffect(filterdata, [
    isCheckMen,
    isCheckWomen,
    isCheckBottomwear,
    isCheckWinterwear,
    isCheckkids,
    isChecktopwear,
  ]);

  return (
    <div className="collection">
      <div className="collection1">
        <div className="filter">
          <div className="filterh3">
            <h3>FILTERS</h3>
          </div>
          <div className="categories">
            <h4>CATEGORIES</h4>
            <div className="Men">
              <input
                type="checkbox"
                onChange={(e) => setIsCheckMen(e.target.checked)}
              />
              <label htmlFor="Men">Men</label>
            </div>
            <div className="Women">
              <input
                type="checkbox"
                onChange={(e) => setIsCheckWomen(e.target.checked)}
              />
              <label htmlFor="Women">Women</label>
            </div>
            <div className="kids">
              <input
                type="checkbox"
                onChange={(e) => setIsCheckkids(e.target.checked)}
              />
              <label htmlFor="kids">kids</label>
            </div>
          </div>

          <div className="type">
            <h4>TYPE</h4>
            <div className="topwear">
              <input
                type="checkbox"
                onChange={(e) => setIsCheckwear(e.target.checked)}
                name="type1"
              />
              <label htmlFor="Topwear">Topwear</label>
            </div>
            <div className="bottomwear">
              <input
                type="checkbox"
                onChange={(e) => setIsCheckbottomwear(e.target.checked)}
                name="type2"
              />
              <label htmlFor="Bottomwear">Bottomwear</label>
            </div>
            <div className="winterwear">
              <input
                type="checkbox"
                onChange={(e) => setIsCheckWinterwear(e.target.checked)}
                name="type3"
              />
              <label htmlFor="Winterwear">Winterwear</label>
            </div>
          </div>
        </div>
        <div className="AllCollections">
          <div className="firstLineCollection">
            <div className="AllCollection">
              <h2>
                <span>ALL</span>COLLECTIONS
              </h2>
              <p className="line"></p>
            </div>
            <div className="SortBy">
              <select name="">
                <option value="Relavent">Sort by:Relavent</option>
                <option value="LowHigh">Sort by:Low to High</option>
                <option value="HighLow">Sort by:High to Low</option>
              </select>
            </div>
          </div>
          <div className="latestCard2 latestCard3">
            {product.map((data, index) => {
              return (
                <div key={index} className="card">
                  <div className="img">
                    <Link to={`/ProductDetail/${data._id}`}>
                      <img src={data.images[0]} alt="" />
                    </Link>
                  </div>
                  <div className="imformation">
                    <p className="PName">{data.ProductName}</p>
                    <p className="PPrice">${data.ProductPrice}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection1;
