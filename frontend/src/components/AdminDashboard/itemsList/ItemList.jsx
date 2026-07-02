import { useEffect, useState } from "react";
import "../itemsList/ItemList.css";
import axios from "axios";
import { backendurl } from "../../../App";

import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ItemList = () => {
  const navigate=useNavigate();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const data = async () => {
      const response = await axios.get(`${backendurl}/api/product/alldata`);
      setProduct(response.data);
    };
    data();
  }, []);

  console.log(product);

  const deletehandle = async (id) => {
    const deletedata = await axios.post(`${backendurl}/api/product/delete`, {
      id,
    });
    console.log("deleteData",deletedata.data);

    if(!deletedata.data){
      return;
    }
    setProduct(deletedata.data);
    
    navigate('/items');
    
  };

  return (
    <div className="List">
      <div className="List1">
        <div className="ListP">
          <p>All Products List</p>
        </div>
        <div className="tableList">
          <div className="navbartable">
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
          </div>
          <div className="datatable">
            {product.map((data, index) => {
              return (
                <div className="display1" key={index}>
                  <p className="imgData">
                    <img src={data.images[0]} alt="" />
                  </p>
                  <p>{data.ProductName}</p>
                  <p>{data.ProductCategory}</p>
                  <p>$ {data.ProductPrice}</p>
                  <button onClick={() => deletehandle(data._id)}>
                    <p className="textalinecenter">{<IoMdClose />}</p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
