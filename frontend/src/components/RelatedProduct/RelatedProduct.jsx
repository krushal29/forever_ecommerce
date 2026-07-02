import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { backendurl } from "../../App";

const RelatedProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [relatedData, setrelatedData] = useState([]);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(`${backendurl}/api/product/alldata`);
      setProduct(response.data);
      const filterdata = product.find((data) => data._id === id);
      // console.log("data",filterdata);
      
      const related = filterdata.SubCategor;
      if (filterdata) {
        const relatedfilter = product.filter(
          (data) => data.SubCategor === related && data._id != id
        );
        // console.log("rel", relatedData);
        setrelatedData(relatedfilter);
      }
    };
    data();
  }, [product]);

  return (
    <>
      <div className="latest">
        <div className="latest1">
          <div className="latest2">
            <div className="latestdetail">
              <h1>
                <span>RELATED</span>PRODUCTS
              </h1>
              <p className="line"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="latestCard1">
        <div className="latestCard2">
          {relatedData.map((data, index) => {
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
    </>
  );
};

export default RelatedProduct;
