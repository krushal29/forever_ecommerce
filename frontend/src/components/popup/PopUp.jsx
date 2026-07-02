import "../popup/PopUp.css";

import { IoCloseSharp } from "react-icons/io5";
const PopUp = (props) => {
  return (
    <div className="card">
      <div className="text">
        <p>Select Product Size</p>
      </div>
      <div className="close">
        <button>
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default PopUp;
