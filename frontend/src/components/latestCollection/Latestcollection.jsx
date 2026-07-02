import "../latestCollection/Latestcollection.css";

import { Link } from "react-router-dom";
import axios from 'axios'
import { backendurl } from "../../App";
import { useEffect, useState } from "react";

const Latestcollection = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(()=>{
    const data=async()=>{
      const response = await axios.get(`${backendurl}/api/product/latest`);
      setProducts(response.data);
    };
    data();

    
  },[]);
// console.log(products);


  return (
    <>
      <div className="latest">
        <div className="latest1">
          <div className="latest2">
            <div className="latestdetail">
              <h1>
                <span>LATEST</span>COLLECTIONS
              </h1>
              <p className="line"></p>
            </div>
            <div className="latestdetailp">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="latestCard1">
        <div className="latestCard2">
          {products.map((data, index) => {
            return (
              <div key={index} className="card">
                <div className="img">
                <Link to={`/ProductDetail/${data._id}`}><img src={data.images[0]} alt="" /></Link>
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
    </>
  );
};

export default Latestcollection;
