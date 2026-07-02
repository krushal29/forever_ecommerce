import "../items/Items.css";
import { Link, useLocation } from "react-router-dom";

import { IoMdAddCircleOutline } from "react-icons/io";
import { TbClipboardList } from "react-icons/tb";

const Items = () => {
  const location = useLocation().pathname;
  console.log("location", location);

  return (
    <div className="items">
      <div className="items1">
        <div className="items2">
          <div className="addItems">
            <button
              style={
                location === "/add"
                  ? { backgroundColor: "#ffebf5", border: "1px solid #c586a5" }
                  : undefined
              }
            >
              <Link to={"/add"}>
                <p>
                  <IoMdAddCircleOutline style={{ fontSize: "24px" }} />
                </p>
                <p> Add Items</p>
              </Link>
            </button>
          </div>
          <div className="listItems">
            <button
              style={
                location === "/items"
                  ? { backgroundColor: "#ffebf5", border: "1px solid #c586a5" }
                  : undefined
              }
            >
              <Link to={"/items"}>
                <p>
                  <TbClipboardList style={{ fontSize: "24px" }} />
                </p>
                <p> List Items</p>
              </Link>
            </button>
          </div>
          <div className="order">
            <button style={location==='/Order'?{backgroundColor:"#ffebf5",border:"1px solid #c586a5"}:undefined}>
              <Link to={"/Order"}>
                <p>
                  <TbClipboardList style={{ fontSize: "24px" }} />
                </p>
                <p> Orders</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
